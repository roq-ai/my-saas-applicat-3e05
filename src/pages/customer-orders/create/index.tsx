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
import { createCustomerOrder } from 'apiSdk/customer-orders';
import { Error } from 'components/error';
import { customerOrderValidationSchema } from 'validationSchema/customer-orders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { MenuItemInterface } from 'interfaces/menu-item';
import { UserInterface } from 'interfaces/user';
import { getMenuItems } from 'apiSdk/menu-items';
import { getUsers } from 'apiSdk/users';
import { CustomerOrderInterface } from 'interfaces/customer-order';

function CustomerOrderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CustomerOrderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCustomerOrder(values);
      resetForm();
      router.push('/customer-orders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CustomerOrderInterface>({
    initialValues: {
      order_status: '',
      menu_item_id: (router.query.menu_item_id as string) ?? null,
      customer_id: (router.query.customer_id as string) ?? null,
      waitstaff_id: (router.query.waitstaff_id as string) ?? null,
    },
    validationSchema: customerOrderValidationSchema,
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
            Create Customer Order
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="order_status" mb="4" isInvalid={!!formik.errors?.order_status}>
            <FormLabel>Order Status</FormLabel>
            <Input type="text" name="order_status" value={formik.values?.order_status} onChange={formik.handleChange} />
            {formik.errors.order_status && <FormErrorMessage>{formik.errors?.order_status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<MenuItemInterface>
            formik={formik}
            name={'menu_item_id'}
            label={'Select Menu Item'}
            placeholder={'Select Menu Item'}
            fetcher={getMenuItems}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
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
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'waitstaff_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
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
  entity: 'customer_order',
  operation: AccessOperationEnum.CREATE,
})(CustomerOrderCreatePage);
