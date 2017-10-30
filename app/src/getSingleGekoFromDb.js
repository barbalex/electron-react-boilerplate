export default function (db, idGeschaeft, gekoNr) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        geko
      WHERE
        idGeschaeft = ${idGeschaeft} AND
        gekoNr = '${gekoNr}'`

    db.query(sql, (error, result) => {
      if (error) reject(error)
      resolve(result[0])
    })
  })
}
