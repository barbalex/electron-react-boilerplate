export default function () {
  const filter = [
    {
      field: 'geschaeftsart',
      value: 'Vernehmlassung',
      comparator: '=',
    },
    {
      field: 'status',
      value: 'angekündigt',
      comparator: '=',
    },
  ]
  return filter
}
