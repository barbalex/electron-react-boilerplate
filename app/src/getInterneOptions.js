export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        interne
      ORDER BY
        kurzzeichen`

    db.all(sql, (error, options) => {
      if (error) reject(error)
      resolve(options)
    })
  })
}
