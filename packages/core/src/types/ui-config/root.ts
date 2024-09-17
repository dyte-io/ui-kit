type Children = Element | string;
// NOTE(vaibhavshn): To support older ts versions, removed named tuples
// type Element = string | [tag: string, props?: ElementProps];
export type Element = string | [string, ElementProps?, ...Children[]];

export interface ElementProps {
  [key: string]: any;
}

export interface StyleProps {
  [key: string]: string;
}

export interface UIRoot {
  [element: string]:
    | Element[]
    | {
        state?: string;
        states?: string[];
        props?: {
          [key: string]: any;
        };
        children?: Element[];
        add?: Element[];
        prepend?: Element[];
        remove?: string[];
        addBefore?: Record<string, Element[]>;
      };
}
