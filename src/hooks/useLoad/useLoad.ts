import { useState, useEffect } from 'react';

import ILoadingState from './useLoad.interface'

/**
 * Нерабочий набросок универсального хука для загрузки данных
 * 
 * @param apiFunc - функция API для загрузки конкретных данных
 * @param params  - дополнительные параметры функции API
 * @returns - объект состояния загрузки типа ILoadingState (загрузка, наличие ошибок, загруженные данные)
 */

export default function useLoad<T>(apiFunc: () => Promise<T>, deps: unknown[] = []): ILoadingState<T> {
    const [state, setState] = useState<ILoadingState<T>>({
      isLoading: false,
      hasError: false,
      data: null
    });

    useEffect(() => {
      let cancelled = false;

      setState({
        isLoading: true,
        hasError: false,
        data: null
      });

      apiFunc()
      .then(data => {
        if (cancelled) return;
        setState({
          isLoading: false,
          hasError: false,
          data: data
        });
      })
      .catch(() => {
        if (cancelled) return;
        console.error('Ошибка Promise');
        setState({
          isLoading: false,
          hasError: true,
          data: null
        });
      });

      return () => {
        cancelled = true;
      };

    }, deps);

    return state;
  }