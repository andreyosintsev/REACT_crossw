import { FC } from 'react';
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';

import IPageSlider from './page-slider.interface';
import styles from './page-slider.module.scss';

import imgArrowLeft from './imgs/arrow_left.png';
import imgArrowRight from './imgs/arrow_right.png';

const PageSlider: FC<IPageSlider> = ({ images }) => {
    return (
        <div className = { styles.slider } id="slider-new">
            <div className = { classNames(styles.slider__button, styles.sliderbutton_left) }>
                <img 
                    className = { styles.sliderbutton__image }
                    src = { imgArrowLeft }
                    alt = "Влево"
                />
            </div>
            <ul className="slider__items">
                {
                    images.map(image => 
                        <li className = { styles.slider__item } key = { uuid() }> 
                            {
                                <Link className = { styles.slider__link } to = {image.link} title = "Разгадать кроссворд">

                                    <img className = { styles.slider__image } src = { image.src } alt = { image.alt } />
                                
                                </Link>     
                                                           
                            }
                        </li>                        
                    )
                }
            </ul>
            <div className = { classNames(styles.slider__button, styles.sliderbutton_right) }>
                <img 
                    className = { styles.sliderbutton__image }
                    src = {imgArrowRight}
                    alt = "Вправо"
                />
            </div> 
        </div>
    )
}

export default PageSlider