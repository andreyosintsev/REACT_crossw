interface ISlider {
    /**
     * Возвращает ширину слайда по его номеру (включая margin).
     * @param slideNum Номер слайда (начиная с 0)
     */
    getSlideWidthByNum(slideNum): number;

    /**
     * Возвращает ширину переданного слайда (включая margin).
     * @param slide DOM-элемент слайда
     */
    getSlideWidthBySlide(slide): number;

    /** Инициализирует слайдер (вычисляет ширину, назначает события) */
    init(): void;

    /** Прокручивает слайдер влево */
    slideLeft(): void;

    /** Прокручивает слайдер вправо */
    slideRight(): void;
}

export default ISlider;
