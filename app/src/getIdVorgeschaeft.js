export default function (geschaefte, idGeschaeft) {
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === idGeschaeft
  )
  if (geschaeft && geschaeft.idVorgeschaeft) {
    // idVorgeschaeft arrives as string
    // need to convert it to number
    return geschaeft.idVorgeschaeft
  }
  return null
}
