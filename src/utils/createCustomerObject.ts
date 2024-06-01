import { Customer, AddressData } from '@/interface';

export default function createUser(customer: Customer): Customer {
  return {
    id: customer.id,
    dateOfBirth: customer.dateOfBirth,
    defaultBillingAddressId: customer.defaultBillingAddressId,
    defaultShippingAddressId: customer.defaultShippingAddressId,
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    password: customer.password,
    authenticationMode: customer.authenticationMode,
    billingAddressIds: customer.billingAddressIds,
    shippingAddressIds: customer.shippingAddressIds,
    addresses: customer.addresses as AddressData[],
    version: customer.version,
  };
}
