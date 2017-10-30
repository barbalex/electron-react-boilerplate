export default function (db, idGeschaeft, url) {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM
        links
      WHERE
        idGeschaeft = ${idGeschaeft} AND
        url = '${url}'`

    db.query(sql, error => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
