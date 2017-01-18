export default function (geschaefte, idGeschaeft) {
  // idVorgeschaeft arrives as string
  // need to convert it to number
  const nachgeschaeft = geschaefte.find(g =>
    g.idVorgeschaeft === idGeschaeft
  )
  if (nachgeschaeft && nachgeschaeft.idGeschaeft) {
    return nachgeschaeft.idGeschaeft
  }
  return null
}
