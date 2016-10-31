export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        geschaefteKontakteIntern`

    db.all(sql, (error, geschaefteKontakteIntern) => {
      if (error) reject(error)
      resolve(geschaefteKontakteIntern)
    })
  })
}
