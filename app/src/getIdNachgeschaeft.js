export default function (geschaefte, idGeschaeft) {
  const nachgeschaeft = geschaefte.find(g =>
    g.idVorgeschaeft === idGeschaeft
  )
  if (nachgeschaeft && nachgeschaeft.idGeschaeft) {
    return nachgeschaeft.idGeschaeft
  }
  return null
}
