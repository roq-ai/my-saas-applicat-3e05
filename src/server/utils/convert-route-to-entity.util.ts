const mapping: Record<string, string> = {
  'customer-orders': 'customer_order',
  'menu-items': 'menu_item',
  restaurants: 'restaurant',
  'table-reservations': 'table_reservation',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
