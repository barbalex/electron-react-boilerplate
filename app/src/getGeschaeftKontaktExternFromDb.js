export default function (db, idGeschaeft, idKontakt) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        geschaefteKontakteExtern
      WHERE
        idGeschaeft = ${idGeschaeft}
        AND idKontakt = ${idKontakt}`

    db.get(sql, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
