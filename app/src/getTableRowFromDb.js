export default function (db, table, id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        ${table}
      WHERE
        id = ${id}`

    db.query(sql, (error, row) => {
      if (error) reject(error)
      const result = row[0]
      // react does not want to get null values
      Object.keys(result).forEach(key => {
        if (result[key] === null) {
          result[key] = ''
        }
      })
      resolve(result)
    })
  })
}
