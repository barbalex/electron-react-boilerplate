import isDateField from './isDateField'
import convertDateToDdMmYyyy from './convertDateToDdMmYyyy'

const sql = `
  SELECT
    *
  FROM
    geschaefte
  ORDER BY
    idGeschaeft DESC`

export default db => {
  let geschaefte = []
  try {
    geschaefte = db.prepare(sql).all()
  } catch (error) {
    throw error
  }

  /**
   * convert date fields
   * from YYYY-MM-DD to DD.MM.YYYY
   */
  geschaefte.forEach(g => {
    const geschaeft = g
    Object.keys(geschaeft).forEach(field => {
      if (isDateField(field)) {
        geschaeft[field] = convertDateToDdMmYyyy(geschaeft[field])
      }
    })
  })
  console.log('getGeschaefteFromDb', { geschaefte })
  return geschaefte
}
