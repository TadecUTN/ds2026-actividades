import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../services/api';

// Busca y trae información desde un endpoint o función de servicio y maneja la espera y los errores
export function useFetch<T>(
    endpointOrFn: string | (() => Promise<T>),
    dependencies: unknown[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = typeof endpointOrFn === 'function'
                ? await endpointOrFn()
                : await apiFetch<T>(endpointOrFn);
            setData(result);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo
    }, dependencies);

    useEffect(() => {
        execute();
    }, [execute]);

    return { data, loading, error, refetch: execute, setData };
}

