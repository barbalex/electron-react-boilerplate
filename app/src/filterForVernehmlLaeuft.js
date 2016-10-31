export default function () {
  const filter = [
    {
      field: 'geschaeftsart',
      value: 'Vernehmlassung',
      comparator: '=',
    },
    {
      field: 'status',
      value: 'überwachen int.',
      comparator: '=',
    },
  ]
  return filter
}
