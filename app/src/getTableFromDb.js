export default (db, table) => {
  let result
  try {
    result = db.prepare(`SELECT * FROM ${table}`).all()
  } catch (error) {
    throw error
  }
  return result
}
