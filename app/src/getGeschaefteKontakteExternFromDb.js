export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        geschaefteKontakteExtern`

    db.query(sql, (error, geschaefteKontakteExtern) => {
      if (error) reject(error)
      resolve(geschaefteKontakteExtern)
    })
  })
}
