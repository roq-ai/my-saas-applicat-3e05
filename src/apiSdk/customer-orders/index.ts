import axios from 'axios';
import queryString from 'query-string';
import { CustomerOrderInterface, CustomerOrderGetQueryInterface } from 'interfaces/customer-order';
import { GetQueryInterface } from '../../interfaces';

export const getCustomerOrders = async (query?: CustomerOrderGetQueryInterface) => {
  const response = await axios.get(`/api/customer-orders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCustomerOrder = async (customerOrder: CustomerOrderInterface) => {
  const response = await axios.post('/api/customer-orders', customerOrder);
  return response.data;
};

export const updateCustomerOrderById = async (id: string, customerOrder: CustomerOrderInterface) => {
  const response = await axios.put(`/api/customer-orders/${id}`, customerOrder);
  return response.data;
};

export const getCustomerOrderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/customer-orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCustomerOrderById = async (id: string) => {
  const response = await axios.delete(`/api/customer-orders/${id}`);
  return response.data;
};
