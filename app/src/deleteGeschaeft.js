export default function (db, idGeschaeft) {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM
        geschaefte
      WHERE
        idGeschaeft = ${idGeschaeft}`

    db.run(sql, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
