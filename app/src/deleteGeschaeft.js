export default function(db, idGeschaeft) {
  const sql = `
    DELETE FROM
      geschaefte
    WHERE
      idGeschaeft = $idGeschaeft`
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
