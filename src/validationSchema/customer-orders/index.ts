import * as yup from 'yup';

export const customerOrderValidationSchema = yup.object().shape({
  order_status: yup.string().required(),
  menu_item_id: yup.string().nullable().required(),
  customer_id: yup.string().nullable().required(),
  waitstaff_id: yup.string().nullable().required(),
});
