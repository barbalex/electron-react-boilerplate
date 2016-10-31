export default function (db, idGeschaeft, idKontakt) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        geschaefteKontakteIntern
      WHERE
        idGeschaeft = ${idGeschaeft}
        AND idKontakt = ${idKontakt}`

    db.get(sql, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
