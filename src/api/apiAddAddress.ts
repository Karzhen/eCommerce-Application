import store from '@redux/store/configureStore';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { UPDATE_USER, UPDATE_VERSION } from '@/redux/actions/login';
import { getAddressData } from '@/utils/getRegistrationData';
import { createAndShowPopup } from '@/pages/registrationPage/registration/eventHandlers';
import { Customer } from '@/interface';
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
    const { streetName, postalCode, city, country } = billingAddress;

    const shippingAddress = getAddressData('shipping');
    const {
      streetName: shippingStreetName,
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
      store.dispatch(UPDATE_USER({ user: updatedCustomer as Customer }));

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
        store.dispatch(
          UPDATE_USER({ user: responseBillingAdd.body as Customer }),
        );

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
          store.dispatch(
            UPDATE_USER({ user: responseSetDefaultBilling.body as Customer }),
          );
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
            store.dispatch(
              UPDATE_USER({ user: responseBillingShipping.body as Customer }),
            );

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

              newVersion = responseSetDefaultBilling.body.version;
              store.dispatch(UPDATE_VERSION(newVersion));
              store.dispatch(
                UPDATE_USER({
                  user: responseSetDefaultBilling.body as Customer,
                }),
              );
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

              newVersion = responseSetDefaultShipping.body.version;
              store.dispatch(UPDATE_VERSION(newVersion));
              store.dispatch(
                UPDATE_USER({
                  user: responseSetDefaultShipping.body as Customer,
                }),
              );
            }
          }
        }
      }

      if (!sameAddress) {
        const responseAddShipping = await apiRoot
          .withProjectKey({ projectKey })
          .me()
          .post({
            body: {
              version: newVersion, // Использование одной переменной для версии
              actions: [
                {
                  action: 'addAddress',
                  address: {
                    streetName: shippingStreetName,
                    postalCode: shippingPostalCode,
                    city: shippingCity,
                    country: getCountryCode(shippingCountry),
                  },
                },
              ],
            },
          })
          .execute();

        if (responseAddShipping.statusCode === 200) {
          newVersion = responseAddShipping.body.version; // Обновление значения переменной для версии
          store.dispatch(UPDATE_VERSION(newVersion));
          store.dispatch(
            UPDATE_USER({ user: responseAddShipping.body as Customer }),
          );

          const newShippingAddressId =
            responseAddShipping.body.addresses[
              responseAddShipping.body.addresses.length - 1
            ].id;

          const responseAddShippingId = await apiRoot
            .withProjectKey({ projectKey })
            .me()
            .post({
              body: {
                version: newVersion,
                actions: [
                  {
                    action: 'addShippingAddressId',
                    addressId: newShippingAddressId,
                  },
                ],
              },
            })
            .execute();

          if (responseAddShippingId.statusCode === 200) {
            newVersion = responseAddShippingId.body.version;
            store.dispatch(UPDATE_VERSION(newVersion));
            store.dispatch(
              UPDATE_USER({ user: responseAddShippingId.body as Customer }),
            );

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
                        addressId: newShippingAddressId,
                      },
                    ],
                  },
                })
                .execute();

              newVersion = responseSetDefaultShipping.body.version;
              store.dispatch(UPDATE_VERSION(newVersion));
              store.dispatch(
                UPDATE_USER({
                  user: responseSetDefaultShipping.body as Customer,
                }),
              );
            }
          }
        }
      }
    }
    createAndShowPopup(
      'Address successfully added',
      'You have added the address',
      true,
    );
  } catch (error) {
    if (error instanceof Error) {
      createAndShowPopup(
        'The address was not added',
        `Error: ${error.message}`,
        false,
      );
    }
  }
}
