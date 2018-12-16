export default (db, idGeschaeft, gekoNr) => {
  try {
    db.prepare(
      `
      INSERT INTO
        geko (idGeschaeft, gekoNr)
      VALUES
        (${idGeschaeft}, ${gekoNr})`,
    ).run()
  } catch (error) {
    throw error
  }

  // return full dataset
  let geko
  try {
    geko = db
      .prepare(
        `
        SELECT
          *
        FROM
          geko
        WHERE
          idGeschaeft = ${idGeschaeft} AND
          gekoNr = ${gekoNr}`,
      )
      .get()
  } catch (error) {
    throw error
  }
  return geko
}
