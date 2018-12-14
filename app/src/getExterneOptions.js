const sql = `
  SELECT
    *, name || ' ' || vorname AS nameVorname
  FROM
    externe
  ORDER BY
    name,
    vorname`

export default db => {
  let options = []
  try {
    options = db.prepare(sql).all()
  } catch (error) {
    throw error
  }
  return options
}
