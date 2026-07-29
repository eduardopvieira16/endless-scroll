export interface Person {
    id: string;
    name: string;
    email: string;
    city: string;
    country: string;
    avatar: string;
    memberSince: number;
}
export interface PeoplePage {
    items: Person[];
    source: 'remote' | 'fallback';
}
