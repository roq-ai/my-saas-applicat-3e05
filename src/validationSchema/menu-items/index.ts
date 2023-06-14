import * as yup from 'yup';
import { customerOrderValidationSchema } from 'validationSchema/customer-orders';

export const menuItemValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  status: yup.string().required(),
  restaurant_id: yup.string().nullable().required(),
  customer_order: yup.array().of(customerOrderValidationSchema),
});
