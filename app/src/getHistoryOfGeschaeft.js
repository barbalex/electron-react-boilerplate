import getIdVorgeschaeft from './getIdVorgeschaeft'
import getIdNachgeschaeft from './getIdNachgeschaeft'

export default function (geschaefte, activeId) {
  const history = [activeId]
  let idVorgeschaeft = getIdVorgeschaeft(geschaefte, activeId)
  while (!!idVorgeschaeft) {
    history.unshift(idVorgeschaeft)
    idVorgeschaeft = getIdVorgeschaeft(geschaefte, idVorgeschaeft)
  }
  let idNachgeschaeft = getIdNachgeschaeft(geschaefte, activeId)
  while (!!idNachgeschaeft) {
    history.push(idNachgeschaeft)
    idNachgeschaeft = getIdNachgeschaeft(geschaefte, idNachgeschaeft)
  }
  return history
}
