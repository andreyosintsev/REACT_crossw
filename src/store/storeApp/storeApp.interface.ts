interface IStoreApp {
    /** Флаг процесса загрузки */
    isLoading: boolean;
    /** Сообщение об ошибке */
    error: string | null;

    /**
     * Устанавливает флаг загрузки вручную
     * @param {boolean} load - Состояние загрузки (true/false)
     * @returns {void}
     *
     * @example
     * setLoading(true); // Начало загрузки
     * setLoading(false); // Конец загрузки
     */
    setLoading: (value: boolean) => void;

    /**
     * Устанавливает сообщение об ошибке
     * @param {string | null} value - сообщение об ошибке или null, если ошибки нет
     * @returns {void}
     *
     * @description
     * Устанавливает общее сообщение об ошибке.
     *
     * @example
     * setError('Ошибка');
     */
    setError: (value: string | null) => void;

    /**
     * Очищает сообщение об ошибке
     * @returns {void}
     *
     * @example
     * clearError();
     */
    clearError: () => void;


}

export default IStoreApp;
