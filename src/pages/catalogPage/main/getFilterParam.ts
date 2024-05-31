import { Filter } from '@/interface';

export default function getFilterParam(
  FILTER_BLOCK: HTMLElement,
  categoriesId: string[],
) {
  const filter: Filter = {};

  const category = categoriesId[categoriesId.length - 1];
  const sort = (
    FILTER_BLOCK.querySelector('#sort') as HTMLElement
  ).children[0].getAttribute('value');
  const priceStart = (
    FILTER_BLOCK.querySelector('#priceStartInput') as HTMLInputElement
  ).value;
  const priceEnd = (
    FILTER_BLOCK.querySelector('#priceEndInput') as HTMLInputElement
  ).value;
  const brand = (
    FILTER_BLOCK.querySelector('#filterBrand') as HTMLElement
  ).children[0].getAttribute('value');
  const color = (
    FILTER_BLOCK.querySelector('#filterColor') as HTMLElement
  ).children[0].getAttribute('value');
  const size1 = FILTER_BLOCK.querySelector(
    '#checkboxSize1',
  ) as HTMLInputElement;
  const size2 = FILTER_BLOCK.querySelector(
    '#checkboxSize2',
  ) as HTMLInputElement;
  const size3 = FILTER_BLOCK.querySelector(
    '#checkboxSize3',
  ) as HTMLInputElement;

  if (sort) {
    const [order, name] = sort.split('.');
    filter.sort = { name, order };
  }
  if (category) {
    filter.category = category;
  }
  if (priceStart) {
    filter.priceStart = Number(priceStart) * 100;
  }
  if (priceEnd) {
    filter.priceEnd = Number(priceEnd) * 100;
  }
  if (brand) {
    filter.brand = brand;
  }
  if (color) {
    filter.color = color;
  }
  if (size1.checked) {
    if (!filter.size) {
      filter.size = [];
    }
    filter.size.push(size1.value);
  }
  if (size2.checked) {
    if (!filter.size) {
      filter.size = [];
    }
    filter.size.push(size2.value);
  }
  if (size3.checked) {
    if (!filter.size) {
      filter.size = [];
    }
    filter.size.push(size3.value);
  }

  return filter;
}
