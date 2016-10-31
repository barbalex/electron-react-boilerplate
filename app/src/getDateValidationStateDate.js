import validateDate from './validateDate'

export default function (date) {
  switch (validateDate(date)) {
    case true:
      return null
    case false:
      return 'error'
    default:
      return null
  }
}
