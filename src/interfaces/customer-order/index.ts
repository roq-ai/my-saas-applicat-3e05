import { MenuItemInterface } from 'interfaces/menu-item';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerOrderInterface {
  id?: string;
  menu_item_id: string;
  customer_id: string;
  waitstaff_id: string;
  order_status: string;
  created_at?: any;
  updated_at?: any;

  menu_item?: MenuItemInterface;
  user_customer_order_customer_idTouser?: UserInterface;
  user_customer_order_waitstaff_idTouser?: UserInterface;
  _count?: {};
}

export interface CustomerOrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  menu_item_id?: string;
  customer_id?: string;
  waitstaff_id?: string;
  order_status?: string;
}
