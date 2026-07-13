import { useState, useEffect, useCallback } from 'react';

// Busca y trae información desde un servicio y maneja la espera y los errores
export function useFetch<T>(fetchFn: () => Promise<T>, dependencies: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFn();
            setData(result);
        } catch (err: any) {
            setError(err.message || 'Error al obtener los datos');
        } finally {
            setLoading(false);
        }
    }, dependencies);

    useEffect(() => {
        execute();
    }, [execute]);

    return { data, loading, error, refetch: execute, setData };
}
