export default function (db) {
  return new Promise((resolve, reject) => {
    db.all('PRAGMA table_info(geschaefte)', (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
