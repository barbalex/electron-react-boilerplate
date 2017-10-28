import getLinkFromDb from './getLinkFromDb'

export default function(db, idGeschaeft, url) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO
        links (idGeschaeft, url)
      VALUES
        (${idGeschaeft}, '${url}')`

    db.run(sql, error => {
      if (error) reject(error)
      // return full dataset
      getLinkFromDb(db, idGeschaeft, url)
        .then(link => resolve(link))
        .catch(err => reject(err))
    })
  })
}
