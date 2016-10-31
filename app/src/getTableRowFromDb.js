export default function (db, table, id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        ${table}
      WHERE
        id = ${id}`

    db.get(sql, (error, row) => {
      if (error) reject(error)
      // react does not want to get null values
      Object.keys(row).forEach((key) => {
        if (row[key] === null) {
          row[key] = ''
        }
      })
      resolve(row)
    })
  })
}
