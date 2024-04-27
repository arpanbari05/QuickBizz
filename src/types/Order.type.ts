interface OrderItem {
  _id: string;
  category: string;
  description: string;
  discount: number;
  image: string;
  name: string;
  no_of_reviews: number;
  price: number;
  quantity: number;
  ratings: number;
  seller: string;
  sold_by: string[];
}

interface BillingDetails {
  name: string;
  emailAddress: string;
  apartmentFloor: string;
  companyName: string;
  phoneNumber: string;
  streetAddress: string;
  townCity: string;
}

export default interface Order {
  _id: string;
  cart_items: OrderItem[];
  total_price: number;
  order_date: string;
  status: string;
  billing_details: BillingDetails;
  payment_mode: string;
}
