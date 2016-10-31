import getGeschaeftKontaktInternFromDb from './getGeschaeftKontaktInternFromDb'

export default function (db, idGeschaeft, idKontakt) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO
        geschaefteKontakteIntern (idGeschaeft, idKontakt)
      VALUES
        (${idGeschaeft}, ${idKontakt})`

    db.run(sql, (error) => {
      if (error) reject(error)
      getGeschaeftKontaktInternFromDb(db, idGeschaeft, idKontakt)
        .then(geschaeftKontaktIntern =>
          resolve(geschaeftKontaktIntern)
        )
        .catch(err => reject(err))
    })
  })
}
