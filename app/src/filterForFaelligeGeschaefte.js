import moment from 'moment'

export default function () {
  const now = moment().format('YYYY-MM-DD')
  const filter = [
    {
      field: 'fristMitarbeiter',
      value: now,
      comparator: '<',
    },
    {
      field: 'kannFaelligSein',
      value: true,
      comparator: '===',
    },
  ]
  return filter
}
