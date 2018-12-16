export default (db, name) => {
  let result = []
  try {
    result = db
      .prepare(`SELECT ${name} FROM ${name} WHERE historisch = 0 ORDER BY sort`)
      .all()
  } catch (error) {
    store.geschaefte.error.push(error)
  }
  const options = result.map(res => res[name])
  return options
}
