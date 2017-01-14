export default function (db, idGeschaeft) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        geschaefte
      WHERE
        idGeschaeft = ${idGeschaeft}`

    db.get(sql, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
