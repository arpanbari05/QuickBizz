export default interface Product {
  name: string;
  price: number;
  ratings: number;
  no_of_reviews: number;
  description: string;
  image: string;
  _id: string;
  category: string;
  quantity?: number;
  sold_by?: string[];
}
