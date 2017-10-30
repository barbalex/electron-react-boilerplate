export default function (db, idGeschaeft, gekoNr, field, value) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE
        geko
      SET
        ${field} = '${value}'
      WHERE
        idGeschaeft = ${idGeschaeft} AND
        gekoNr = '${gekoNr}'`

    db.query(sql, error => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
