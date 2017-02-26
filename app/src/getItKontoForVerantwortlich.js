export default (interne, geschaeft) => {
  const intern = interne.find(i =>
    i.kurzzeichen === geschaeft.verantwortlich
  )
  if (intern) return intern.itKonto
  return null
}
