// seems not to be in use

export default function(db) {
  let result = []
  try {
    result = db.prepare('PRAGMA table_info(geschaefte)').all()
  } catch (error) {
    throw error
  }
  return result
}
