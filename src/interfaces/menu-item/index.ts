import { CustomerOrderInterface } from 'interfaces/customer-order';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface MenuItemInterface {
  id?: string;
  name: string;
  price: number;
  status: string;
  restaurant_id: string;
  created_at?: any;
  updated_at?: any;
  customer_order?: CustomerOrderInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    customer_order?: number;
  };
}

export interface MenuItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  status?: string;
  restaurant_id?: string;
}
