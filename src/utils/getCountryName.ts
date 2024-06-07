export default function getCountryName(
  countryCode: string | undefined,
): string {
  switch (countryCode?.toUpperCase()) {
    case 'DE':
      return 'Germany';
    case 'US':
      return 'United States';
    case 'RU':
      return 'Russia';
    default:
      throw new Error(`Country name not found for code ${countryCode}`);
  }
}
