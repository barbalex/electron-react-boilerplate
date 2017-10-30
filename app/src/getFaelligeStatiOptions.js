export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        status
      FROM
        status
      WHERE
        geschaeftKannFaelligSein = 1`

    db.query(sql, (error, result) => {
      if (error) reject(error)
      const options = result.map(res => res.status)
      resolve(options)
    })
  })
}
