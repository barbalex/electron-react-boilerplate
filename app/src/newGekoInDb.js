import getSingleGekoFromDb from './getSingleGekoFromDb'

export default function (db, idGeschaeft, gekoNr) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO
        geko (idGeschaeft, gekoNr)
      VALUES
        (${idGeschaeft}, '${gekoNr}')`

    db.run(sql, (error) => {
      if (error) reject(error)
      // return full dataset
      getSingleGekoFromDb(db, idGeschaeft, gekoNr)
        .then(geko => resolve(geko))
        .catch(err => reject(err))
    })
  })
}
