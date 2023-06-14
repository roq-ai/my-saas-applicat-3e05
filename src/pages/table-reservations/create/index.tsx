import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTableReservation } from 'apiSdk/table-reservations';
import { Error } from 'components/error';
import { tableReservationValidationSchema } from 'validationSchema/table-reservations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';
import { TableReservationInterface } from 'interfaces/table-reservation';

function TableReservationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TableReservationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTableReservation(values);
      resetForm();
      router.push('/table-reservations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TableReservationInterface>({
    initialValues: {
      table_number: 0,
      reservation_status: '',
      customer_id: (router.query.customer_id as string) ?? null,
      restaurant_id: (router.query.restaurant_id as string) ?? null,
    },
    validationSchema: tableReservationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Table Reservation
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="table_number" mb="4" isInvalid={!!formik.errors?.table_number}>
            <FormLabel>Table Number</FormLabel>
            <NumberInput
              name="table_number"
              value={formik.values?.table_number}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('table_number', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.table_number && <FormErrorMessage>{formik.errors?.table_number}</FormErrorMessage>}
          </FormControl>
          <FormControl id="reservation_status" mb="4" isInvalid={!!formik.errors?.reservation_status}>
            <FormLabel>Reservation Status</FormLabel>
            <Input
              type="text"
              name="reservation_status"
              value={formik.values?.reservation_status}
              onChange={formik.handleChange}
            />
            {formik.errors.reservation_status && (
              <FormErrorMessage>{formik.errors?.reservation_status}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'customer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Select Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'table_reservation',
  operation: AccessOperationEnum.CREATE,
})(TableReservationCreatePage);
