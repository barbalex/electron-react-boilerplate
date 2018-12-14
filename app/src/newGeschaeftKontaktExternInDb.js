import getGeschaeftKontaktExternFromDb from './getGeschaeftKontaktExternFromDb'

export default function(db, idGeschaeft, idKontakt) {
  const sql = `
    INSERT INTO
      geschaefteKontakteExtern (idGeschaeft, idKontakt)
    VALUES
      (@idGeschaeft, @idKontakt)`

  try {
    db.prepare(sql).run({ idGeschaeft, idKontakt })
  } catch (error) {
    throw error
  }

  let geschaeftKontaktExtern
  try {
    geschaeftKontaktExtern = getGeschaeftKontaktExternFromDb(
      db,
      idGeschaeft,
      idKontakt,
    )
  } catch (error) {
    throw error
  }
  return geschaeftKontaktExtern
}
