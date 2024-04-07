interface Discount {
  old: number;
  new: number;
}

export interface IBookItem {
  id: string;
  name: string;
  isFavorite: boolean;
  genre: string;
  discount?: Discount;
}
