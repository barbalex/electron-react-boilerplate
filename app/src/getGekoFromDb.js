const sql = `
  SELECT
    *
  FROM
    geko
  ORDER BY
    idGeschaeft,
    gekoNr`

export default db => {
  let geko
  try {
    geko = db.prepare(sql).all()
  } catch (error) {
    throw error
  }
  return geko
}
