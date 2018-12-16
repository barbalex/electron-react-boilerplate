export default (db, idGeschaeft, url) => {
  try {
    db.prepare(
      `
      DELETE FROM
        links
      WHERE
        idGeschaeft = ${idGeschaeft} AND
        url = ${url}`,
    ).run()
  } catch (error) {
    throw error
  }
}
