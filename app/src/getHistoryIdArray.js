export default (geschaeft) => {
  const history = [geschaeft.idGeschaeft]
  let vorgeschaeft = geschaeft.vorgeschaeft
  while (vorgeschaeft) {
    history.unshift(vorgeschaeft.idGeschaeft)
    vorgeschaeft = vorgeschaeft.vorgeschaeft
  }
  let nachgeschaeft = geschaeft.nachgeschaeft
  while (nachgeschaeft) {
    history.push(nachgeschaeft.idGeschaeft)
    nachgeschaeft = nachgeschaeft.nachgeschaeft
  }
  return history
}
