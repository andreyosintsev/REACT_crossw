export const isHorizontalLegendHighlighted = (legendXCoord: number, hoveredX: number | null): boolean => {
    return hoveredX !== null && hoveredX === legendXCoord;
};

export const isVerticalLegendHighlighted = (legendYCoord: number, hoveredY: number | null): boolean => {
    return hoveredY !== null && hoveredY === legendYCoord;
};
