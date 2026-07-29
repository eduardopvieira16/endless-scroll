import { describe, expect, it, vi } from 'vitest';
import { fetchPeoplePage } from './peopleService';
describe('fetchPeoplePage', () => { it('mantém itens disponíveis quando a API falha', async () => { vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline'))); const page = await fetchPeoplePage(2, new AbortController().signal, 5); expect(page.source).toBe('fallback'); expect(page.items).toHaveLength(5); expect(new Set(page.items.map(item => item.id)).size).toBe(5); vi.unstubAllGlobals(); }); });
