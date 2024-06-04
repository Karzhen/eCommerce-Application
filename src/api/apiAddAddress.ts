import store from '@redux/store/configureStore';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { UPDATE_VERSION } from '@/redux/actions/login';
import { getAddressData } from '@/utils/getRegistrationData';
import createCtpClientRefresh from './buildClient/buildClientRefreshTokenFlow';
import { getCountryCode } from './apiRegister';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const ctpClient = createCtpClientRefresh();
const apiRoot = createApiBuilderFromCtpClient(ctpClient);

export default async function sendAddress() {
  try {
    const sameAddress = localStorage.getItem('sameAddress') === 'true';
    const defaultBilling = localStorage.getItem('defaultBilling') === 'true';
    const defaultShipping = localStorage.getItem('defaultShipping') === 'true';
    let newVersion = 0; // Объявление переменной для версии

    const data = store.getState().login;

    const billingAddress = getAddressData('billing');
    const { streetName, streetNumber, postalCode, city, country } =
      billingAddress;

    const shippingAddress = getAddressData('shipping');
    const {
      streetName: shippingStreetName,
      streetNumber: shippingStreetNumber,
      postalCode: shippingPostalCode,
      city: shippingCity,
      country: shippingCountry,
    } = shippingAddress;

    // Общий запрос для одинакового адреса
    const responseAddAddress = await apiRoot
      .withProjectKey({ projectKey })
      .me()
      .post({
        body: {
          version: data.version || 0,
          actions: [
            {
              action: 'addAddress',
              address: {
                streetName,
                streetNumber,
                postalCode,
                city,
                country: getCountryCode(country),
              },
            },
          ],
        },
      })
      .execute();

    if (responseAddAddress.statusCode === 200) {
      const updatedCustomer = responseAddAddress.body;
      const newAddressId =
        updatedCustomer.addresses[updatedCustomer.addresses.length - 1].id;
      newVersion = updatedCustomer.version;
      store.dispatch(UPDATE_VERSION(newVersion));

      const responseBillingAdd = await apiRoot
        .withProjectKey({ projectKey })
        .me()
        .post({
          body: {
            version: newVersion, // Использование одной переменной для версии
            actions: [
              {
                action: 'addBillingAddressId',
                addressId: newAddressId,
              },
            ],
          },
        })
        .execute();

      if (responseBillingAdd.statusCode === 200) {
        newVersion = responseBillingAdd.body.version;
        store.dispatch(UPDATE_VERSION(newVersion));

        if (!sameAddress && defaultBilling) {
          const responseSetDefaultBilling = await apiRoot
            .withProjectKey({ projectKey })
            .me()
            .post({
              body: {
                version: newVersion,
                actions: [
                  {
                    action: 'setDefaultBillingAddress',
                    addressId: newAddressId,
                  },
                ],
              },
            })
            .execute();

          newVersion = responseSetDefaultBilling.body.version;
          store.dispatch(UPDATE_VERSION(newVersion));
        }

        if (sameAddress) {
          const responseBillingShipping = await apiRoot
            .withProjectKey({ projectKey })
            .me()
            .post({
              body: {
                version: newVersion,
                actions: [
                  {
                    action: 'addBillingAddressId',
                    addressId: newAddressId,
                  },
                  {
                    action: 'addShippingAddressId',
                    addressId: newAddressId,
                  },
                ],
              },
            })
            .execute();

          if (responseBillingShipping.statusCode === 200) {
            newVersion = responseBillingShipping.body.version; // Обновление значения переменной для версии
            store.dispatch(UPDATE_VERSION(newVersion));

            if (defaultBilling) {
              const responseSetDefaultBilling = await apiRoot
                .withProjectKey({ projectKey })
                .me()
                .post({
                  body: {
                    version: newVersion,
                    actions: [
                      {
                        action: 'setDefaultBillingAddress',
                        addressId: newAddressId,
                      },
                    ],
                  },
                })
                .execute();

              if (responseSetDefaultBilling.statusCode === 200) {
                newVersion = responseSetDefaultBilling.body.version; // Обновление значения переменной для версии
                store.dispatch(UPDATE_VERSION(newVersion));
              }
            }
            if (defaultShipping) {
              const responseSetDefaultShipping = await apiRoot
                .withProjectKey({ projectKey })
                .me()
                .post({
                  body: {
                    version: newVersion,
                    actions: [
                      {
                        action: 'setDefaultShippingAddress',
                        addressId: newAddressId,
                      },
                    ],
                  },
                })
                .execute();

              if (responseSetDefaultShipping.statusCode === 200) {
                newVersion = responseSetDefaultShipping.body.version; // Обновление значения переменной для версии
                store.dispatch(UPDATE_VERSION(newVersion));
              }
            }
          }
        } else {
          const dataInfo = store.getState().login;
          const responseAddShippingAddress = await apiRoot
            .withProjectKey({ projectKey })
            .me()
            .post({
              body: {
                version: dataInfo.version || 0,
                actions: [
                  {
                    action: 'addAddress',
                    address: {
                      streetName: shippingStreetName,
                      streetNumber: shippingStreetNumber,
                      postalCode: shippingPostalCode,
                      city: shippingCity,
                      country: getCountryCode(shippingCountry),
                    },
                  },
                ],
              },
            })
            .execute();

          if (responseAddShippingAddress.statusCode === 200) {
            const updatedCustomerShipping = responseAddShippingAddress.body;
            const newAddressIdShipping =
              updatedCustomerShipping.addresses[
                updatedCustomerShipping.addresses.length - 1
              ].id;
            newVersion = updatedCustomerShipping.version;
            store.dispatch(UPDATE_VERSION(newVersion));

            const responseShippingAdd = await apiRoot
              .withProjectKey({ projectKey })
              .me()
              .post({
                body: {
                  version: newVersion,
                  actions: [
                    {
                      action: 'addShippingAddressId',
                      addressId: newAddressIdShipping,
                    },
                  ],
                },
              })
              .execute();

            if (responseShippingAdd.statusCode === 200) {
              const CustomerShipping = responseShippingAdd.body;
              newVersion = responseShippingAdd.body.version; // Обновление значения переменной для версии
              store.dispatch(UPDATE_VERSION(newVersion));
              const newIdShipping =
                CustomerShipping.addresses[
                  CustomerShipping.addresses.length - 1
                ].id;

              if (defaultShipping) {
                const responseSetDefaultShipping = await apiRoot
                  .withProjectKey({ projectKey })
                  .me()
                  .post({
                    body: {
                      version: newVersion,
                      actions: [
                        {
                          action: 'setDefaultShippingAddress',
                          addressId: newIdShipping,
                        },
                      ],
                    },
                  })
                  .execute();

                if (responseSetDefaultShipping.statusCode === 200) {
                  newVersion = responseSetDefaultShipping.body.version; // Обновление значения переменной для версии
                  store.dispatch(UPDATE_VERSION(newVersion));
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
