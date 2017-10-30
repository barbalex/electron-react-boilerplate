export default function (
  db,
  table,
  id,
  field,
  value,
) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE
        ${table}
      SET
        ${field} = '${value}'
      WHERE
        id = ${id}`

    db.run(sql, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
