export default function (db, idGeschaeft) {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM
        geschaefte
      WHERE
        idGeschaeft = $id`

    db.run(
      'PRAGMA foreign_keys = ON;',
      (error) => {
        if (error) reject(error)
        db.run(
          sql,
          {
            $id: idGeschaeft,
          },
          (err) => {
            if (err) reject(err)
            resolve(true)
          }
        )
      }
    )
  })
}
