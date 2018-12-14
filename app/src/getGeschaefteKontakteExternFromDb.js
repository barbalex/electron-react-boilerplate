const sql = `
  SELECT
    *
  FROM
    geschaefteKontakteExtern`

export default db => {
  let geschaefteKontakteExtern = []
  try {
    geschaefteKontakteExtern = db.prepare(sql).all()
  } catch (error) {
    throw error
  }
  return geschaefteKontakteExtern
}
