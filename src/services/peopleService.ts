import type { PeoplePage, Person } from '../types/user';
interface RandomUserResponse {
    results?: Array<{
        login?: {
            uuid?: string;
        };
        name?: {
            first?: string;
            last?: string;
        };
        email?: string;
        picture?: {
            large?: string;
        };
        location?: {
            city?: string;
            country?: string;
        };
        registered?: {
            date?: string;
        };
    }>;
}
const FIRST_NAMES = ['Alice', 'Bruno', 'Camila', 'Daniel', 'Elisa', 'Felipe', 'Gabriela', 'Henrique', 'Isabela', 'João', 'Larissa', 'Miguel'];
const LAST_NAMES = ['Almeida', 'Barbosa', 'Cardoso', 'Duarte', 'Esteves', 'Freitas', 'Gomes', 'Lima', 'Mendes', 'Nunes', 'Oliveira', 'Ramos'];
const CITIES = ['São Paulo', 'Curitiba', 'Recife', 'Fortaleza', 'Belo Horizonte', 'Florianópolis', 'Porto Alegre', 'Salvador'];
function svgAvatar(initials: string, hue: number): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="hsl(${hue} 84% 58%)"/><stop offset="1" stop-color="hsl(${(hue + 46) % 360} 82% 46%)"/></linearGradient></defs><rect width="160" height="160" rx="80" fill="url(#g)"/><circle cx="80" cy="58" r="27" fill="white" fill-opacity=".9"/><path d="M30 142c5-34 24-51 50-51s45 17 50 51" fill="white" fill-opacity=".9"/><text x="80" y="151" text-anchor="middle" font-size="0">${initials}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function fallbackPage(page: number, size: number): PeoplePage {
    const items = Array.from({ length: size }, (_, index): Person => {
        const seed = (page - 1) * size + index;
        const first = FIRST_NAMES[seed % FIRST_NAMES.length];
        const last = LAST_NAMES[(seed * 7 + page) % LAST_NAMES.length];
        const name = `${first} ${last}`;
        return {
            id: `fallback-${page}-${index}`,
            name,
            email: `${first}.${last}.${seed}@example.com`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
            city: CITIES[(seed * 5) % CITIES.length],
            country: 'Brasil',
            avatar: svgAvatar(`${first[0]}${last[0]}`, (seed * 37) % 360),
            memberSince: 2018 + (seed % 8),
        };
    });
    return { items, source: 'fallback' };
}
export async function fetchPeoplePage(page: number, signal: AbortSignal, size = 12): Promise<PeoplePage> {
    const controller = new AbortController();
    const timeout = globalThis.setTimeout(() => controller.abort(), 7000);
    const abort = () => controller.abort();
    signal.addEventListener('abort', abort, { once: true });
    try {
        const params = new URLSearchParams({ page: String(page), results: String(size), seed: 'looply-people-v2', inc: 'login,name,email,picture,location,registered' });
        const response = await fetch(`https://randomuser.me/api/?${params.toString()}`, { signal: controller.signal });
        if (!response.ok)
            throw new Error(`HTTP ${response.status}`);
        const data = await response.json() as RandomUserResponse;
        if (!Array.isArray(data.results) || data.results.length === 0)
            throw new Error('Resposta vazia');
        const items = data.results.map((entry, index): Person => {
            const first = entry.name?.first?.trim() || 'Pessoa';
            const last = entry.name?.last?.trim() || String(index + 1);
            return {
                id: entry.login?.uuid || `remote-${page}-${index}-${entry.email || ''}`,
                name: `${first} ${last}`,
                email: entry.email || 'contato@example.com',
                city: entry.location?.city || 'Cidade não informada',
                country: entry.location?.country || 'País não informado',
                avatar: entry.picture?.large || svgAvatar(`${first[0]}${last[0]}`, (page * 59 + index * 31) % 360),
                memberSince: entry.registered?.date ? new Date(entry.registered.date).getFullYear() : 2024,
            };
        });
        return { items, source: 'remote' };
    }
    catch (error) {
        if (signal.aborted)
            throw error;
        return fallbackPage(page, size);
    }
    finally {
        globalThis.clearTimeout(timeout);
        signal.removeEventListener('abort', abort);
    }
}
