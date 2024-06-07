import store from '@redux/store/configureStore';

import {
  AttributeDefinition,
  AttributeEnumType,
  AttributeSetType,
} from '@commercetools/platform-sdk';

function grabValues(element: AttributeDefinition) {
  const enumType = element.type;
  if (enumType.name === 'enum') {
    return (enumType as AttributeEnumType).values;
  }
  if (enumType.name === 'set') {
    return ((enumType as AttributeSetType).elementType as AttributeEnumType)
      .values;
  }
  return [];
}

export default function generateProduct(element: AttributeDefinition) {
  const { language } = store.getState().local;
  return {
    name: element.name,
    label: element.label[language],
    value: grabValues(element),
  };
}
