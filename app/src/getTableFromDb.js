export default function (db, table) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        ${table}`

    db.all(sql, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
