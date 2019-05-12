
export abstract class AbstractTree<T>  {
  abstract getId(): number;
  abstract getParentId(): number;
  abstract getText(): string;
  children: AbstractTree<T>[];
  checked?: boolean;
  disabled?: boolean;
  selected?: boolean;
}



export type Table<T> = {
  [P in keyof T]?: T[P];
}





