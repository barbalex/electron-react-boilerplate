export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        geko
      ORDER BY
        idGeschaeft,
        gekoNr`

    db.all(sql, (error, geko) => {
      if (error) reject(error)

      resolve(geko)
    })
  })
}
