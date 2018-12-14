const sql = `
  DELETE FROM
    geschaefte
  WHERE
    idGeschaeft = $idGeschaeft`

export default (db, idGeschaeft) => {
  try {
    db.pragma('foreign_keys = ON')
  } catch (error) {
    throw error
  }

  try {
    db.prepare(sql).run({ idGeschaeft })
  } catch (error) {
    throw error
  }
  return true
}
