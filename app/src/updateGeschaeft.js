import moment from 'moment'
import app from 'ampersand-app'

import isDateField from './isDateField'
import convertDateToYyyyMmDd from './convertDateToYyyyMmDd'

export default function(db, idGeschaeft, field, value, username) {
  const { store } = app
  /**
   * if field is date field
   * convert DD.MM.YYYY to YYYY-MM-DD
   */
  let value2 = value
  if (isDateField(field)) {
    value2 = convertDateToYyyyMmDd(value)
  }
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const sql = `
    UPDATE
      geschaefte
    SET
      @field = @value2,
      mutationsdatum = @now,
      mutationsperson = @username
    WHERE
      idGeschaeft = @idGeschaeft`
  try {
    db.prepare(sql).run({ field, value2, now, username })
  } catch (error) {
    store.geschaefte.error.push(error)
  }
  return true
}
