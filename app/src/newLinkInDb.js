export default (db, idGeschaeft, url) => {
  try {
    db.prepare(
      `
      INSERT INTO
        links (idGeschaeft, url)
      VALUES
        (${idGeschaeft}, ${url})`,
    ).run()
  } catch (error) {
    throw error
  }
  // return full dataset
  let result
  try {
    result = db
      .prepare(
        `
        SELECT
          *
        FROM
          links
        WHERE
          idGeschaeft = ${idGeschaeft} AND
          url = ${url}`,
      )
      .get()
  } catch (error) {
    throw error
  }
  return result
}
