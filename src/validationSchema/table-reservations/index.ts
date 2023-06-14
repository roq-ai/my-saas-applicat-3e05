import * as yup from 'yup';

export const tableReservationValidationSchema = yup.object().shape({
  table_number: yup.number().integer().required(),
  reservation_status: yup.string().required(),
  customer_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
