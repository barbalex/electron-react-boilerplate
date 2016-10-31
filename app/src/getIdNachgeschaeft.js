export default function (geschaefte, idGeschaeft) {
  // idVorgeschaeft arrives as string
  // need to convert it to number
  const nachgeschaeft = geschaefte.find(g =>
    parseInt(g.idVorgeschaeft, 10) === idGeschaeft
  )
  if (nachgeschaeft && nachgeschaeft.idGeschaeft) {
    return nachgeschaeft.idGeschaeft
  }
  return null
}
