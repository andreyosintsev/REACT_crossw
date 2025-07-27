import { FC, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import IPageNews from './page-news.interface';
import styles from './page-news.module.scss';

import { apiGetNews } from '../../utils/api';
import { INews } from '../../types/api.interface';

const PageBlock: FC<IPageNews> = () => {
    const [newsLoading, setNewsLoading] = useState<{
                                                isLoading: boolean,
                                                hasError: boolean,
                                                news: INews[]
                                            }>
                                            ({
                                                isLoading: false,
                                                hasError: false,
                                                news: []
                                            });

    const getNews = () => {
        setNewsLoading({ 
            isLoading: true, 
            hasError: false,
            news: []        
        })

        try {  
            apiGetNews()
            .then(data => {
                setNewsLoading({
                    isLoading: false,
                    hasError: false,
                    news: data.news
                });
            })
            .catch(error => {
                console.error (`Ошибка Promise: ${error}`);
                setNewsLoading({
                    isLoading: false,
                    hasError: true,
                    news: []
                });
            })            
          } catch (error) {
            const errorMessage: string = error instanceof Error ? error.message : '';
            console.error((`Не удалось получить новости от API: ${errorMessage}`));
            setNewsLoading({
                isLoading: false,
                hasError: true,
                news: []
            });
          }  
    }

    useEffect(
        () => getNews(), 
        []
    );


    return (
        <>
            {
                newsLoading.isLoading && <p>Загрузка новостей...</p>
            }
            {
                !newsLoading.isLoading && newsLoading.hasError && <p>Ошибка загрузки новостей</p>
            }
            <ul className = { styles.news__items }>
                {
                    newsLoading.news.map(news => 
                        <li className = { styles.entry } key = { uuid() }>
                            <div className = { styles.entry__date }>
                                { news.date }
                            </div>
                            <div className = { styles.entry__content }>
                                { news.text }
                            </div>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default PageBlock