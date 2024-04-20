interface Discount {
  old: number;
  new: number;
}

export interface IBookItem {
  id: number;
  name: string;
  isFavorite: boolean;
  genre: string;
  discount?: Discount;
  inCart: number
  price: number
}
