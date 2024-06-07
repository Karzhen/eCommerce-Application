import { CurrencyCode } from '@/interface';

const CENT_IN_DOLLAR = 100;

export default function formatPrice(
  price: number,
  currency: string = CurrencyCode.EN,
) {
  switch (currency) {
    case CurrencyCode.RU:
      return `${(price / CENT_IN_DOLLAR).toFixed(2).replace('.', ',')} ₽`;
    case CurrencyCode.DE:
      return `${(price / CENT_IN_DOLLAR).toFixed(2).replace('.', ',')} €`;
    case CurrencyCode.EN:
    default:
      return `${(price / CENT_IN_DOLLAR).toFixed(2).replace('.', ',')} $`;
  }
}
