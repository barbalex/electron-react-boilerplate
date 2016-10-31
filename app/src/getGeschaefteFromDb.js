import isDateField from '../src/isDateField'
import convertDateToDdMmYyyy from '../src/convertDateToDdMmYyyy'

export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        v_geschaefte
      ORDER BY
        idGeschaeft DESC`

    db.all(sql, (error, geschaefte) => {
      if (error) reject(error)

      /**
       * convert date fields
       * from YYYY-MM-DD to DD.MM.YYYY
       */
      geschaefte.forEach((g) => {
        const geschaeft = g
        Object.keys(geschaeft).forEach((field) => {
          if (isDateField(field)) {
            geschaeft[field] = convertDateToDdMmYyyy(geschaeft[field])
          }
        })
      })

      resolve(geschaefte)
    })
  })
}
