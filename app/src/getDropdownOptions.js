const sql = `
  SELECT
    @name
  FROM
    @name
  WHERE
    historisch = 0
  ORDER BY
    sort`

export default (db, name) => {
  let result
  try {
    result = db.prepare(sql).all({ name })
  } catch (error) {
    throw error
  }
  const options = result.map(res => res[name])
  return options
}
