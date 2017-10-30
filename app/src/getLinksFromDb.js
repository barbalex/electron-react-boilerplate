export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        links
      ORDER BY
        idGeschaeft,
        url`

    db.all(sql, (error, links) => {
      if (error) reject(error)

      resolve(links)
    })
  })
}
