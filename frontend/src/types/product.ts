export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}
export interface PaginationQuery{
  search?: string;
  page?: string;
  limit?: string;
}