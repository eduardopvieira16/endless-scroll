import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPeoplePage } from '../services/peopleService';
import type { Person } from '../types/user';
interface InfinitePeopleState {
    people: Person[];
    isLoading: boolean;
    error: string | null;
    usingFallback: boolean;
    loadMore: () => void;
    retry: () => void;
}
export function useInfinitePeople(): InfinitePeopleState {
    const [people, setPeople] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [usingFallback, setUsingFallback] = useState(false);
    const pageRef = useRef(0);
    const loadingRef = useRef(false);
    const controllerRef = useRef<AbortController | null>(null);
    const mountedRef = useRef(true);
    const requestPage = useCallback(async (page: number) => {
        if (loadingRef.current && !controllerRef.current?.signal.aborted)
            return;
        loadingRef.current = true;
        setIsLoading(true);
        setError(null);
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            const result = await fetchPeoplePage(page, controller.signal);
            if (!mountedRef.current || controller.signal.aborted)
                return;
            pageRef.current = page;
            setUsingFallback((current) => current || result.source === 'fallback');
            setPeople((current) => {
                const ids = new Set(current.map((item) => item.id));
                return [...current, ...result.items.filter((item) => !ids.has(item.id))];
            });
        }
        catch (cause) {
            if (!controller.signal.aborted && mountedRef.current) {
                setError(cause instanceof Error ? cause.message : 'Não foi possível carregar a próxima página.');
            }
        }
        finally {
            if (mountedRef.current && controllerRef.current === controller) {
                loadingRef.current = false;
                setIsLoading(false);
            }
        }
    }, []);
    const loadMore = useCallback(() => { void requestPage(pageRef.current + 1); }, [requestPage]);
    const retry = useCallback(() => { void requestPage(pageRef.current + 1); }, [requestPage]);
    useEffect(() => {
        mountedRef.current = true;
        void requestPage(1);
        return () => {
            mountedRef.current = false;
            controllerRef.current?.abort();
        };
    }, [requestPage]);
    return { people, isLoading, error, usingFallback, loadMore, retry };
}
