export interface GetBooksQuery {
  name_like?: string;
  isFavorite?: string;
  discount_ne?: string;
  genre?: string;
  inCart_ne?: string;
}
