const sql = `
  SELECT
    *
  FROM
    links
  ORDER BY
    idGeschaeft,
    url`

export default db => {
  let links = []
  try {
    links = db.prepare(sql).all()
  } catch (error) {
    throw error
  }
  return links
}
