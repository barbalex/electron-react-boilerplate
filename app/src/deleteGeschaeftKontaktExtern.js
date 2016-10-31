export default function (db, idGeschaeft, idKontakt) {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM
        geschaefteKontakteExtern
      WHERE
        idGeschaeft = ${idGeschaeft}
        AND idKontakt = ${idKontakt}`

    db.run(sql, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
