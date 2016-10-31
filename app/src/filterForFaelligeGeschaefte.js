import moment from 'moment'

export default function () {
  const now = moment().format('YYYY-MM-DD')
  const filter = [
    {
      field: 'fristMitarbeiter',
      value: now,
      comparator: '<',
    },
  ]
  return filter
}
