export default function (num) {
  return new Intl.NumberFormat('ru-RU', { style: 'decimal'}).format(num);
}
