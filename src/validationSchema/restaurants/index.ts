import * as yup from 'yup';
import { menuItemValidationSchema } from 'validationSchema/menu-items';
import { tableReservationValidationSchema } from 'validationSchema/table-reservations';

export const restaurantValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  menu_item: yup.array().of(menuItemValidationSchema),
  table_reservation: yup.array().of(tableReservationValidationSchema),
});
