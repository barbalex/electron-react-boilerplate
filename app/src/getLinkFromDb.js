export default function (db, idGeschaeft, url) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        links
      WHERE
        idGeschaeft = ${idGeschaeft} AND
        url = '${url}'`

    db.get(sql, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
