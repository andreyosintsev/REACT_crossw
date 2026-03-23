import { useCallback, useState } from "react";

const getErrorMessage = (error: unknown, fallback: string): string => {
    return error instanceof Error ? error.message : fallback;
};

const useRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async <T,>(
        request: () => Promise<T>,
        fallbackErrorMessage: string
    ): Promise<T | null> => {

        console.log('useRequest: execute');

        setIsLoading(true);
        setError(null);

        try {
            console.log('useRequest: execute: try');

            return await request();
        } catch (error: unknown) {
            setError(getErrorMessage(error, fallbackErrorMessage));
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        isLoading,
        error,
        setError,
        clearError,
        execute,
    };
};

export default useRequest;
