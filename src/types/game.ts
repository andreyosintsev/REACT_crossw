export type TCellAction = "fill" | "cross";

// Типизация кнопок и разделителей компонента Controls
export type TControlItem =
    | {
          type: "button";
          key: string;
          buttonClassName?: string;
          tooltip?: string;
          image?: string;
          imageClassName?: string;
          alt: string;
          onClick: (e: React.MouseEvent) => void;
      }
    | {
          type: "separator";
          key: string;
      };
