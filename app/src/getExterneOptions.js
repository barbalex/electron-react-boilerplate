export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *, name || ' ' || vorname AS nameVorname
      FROM
        externe
      ORDER BY
        name,
        vorname`

    db.all(sql, (error, options) => {
      if (error) reject(error)
      resolve(options)
    })
  })
}
