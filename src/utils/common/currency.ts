export function currency(
  num: number,
  locale: string,
  currency: string,
  digits: number = 0
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: digits
  }).format(num);
}

export function currencyTWD(num: number) {
  return currency(num, 'zh-TW', 'TWD');
}
