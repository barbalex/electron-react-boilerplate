export default function (
  db,
  idGeschaeft,
  url,
  field,
  value,
) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE
        links
      SET
        ${field} = '${value}'
      WHERE
        idGeschaeft = ${idGeschaeft} AND
        url = '${url}'`

    db.run(sql, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
