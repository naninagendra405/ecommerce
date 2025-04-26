export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type Category = string;

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface FilterOptions {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
}
