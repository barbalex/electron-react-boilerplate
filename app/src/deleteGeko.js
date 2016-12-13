export default function (db, idGeschaeft, gekoNr) {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM
        geko
      WHERE
        idGeschaeft = ${idGeschaeft} AND
        gekoNr = '${gekoNr}'`

    db.run(sql, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
