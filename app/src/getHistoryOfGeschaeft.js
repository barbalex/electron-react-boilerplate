import getIdVorgeschaeft from './getIdVorgeschaeft'
import getIdNachgeschaeft from './getIdNachgeschaeft'

export default function (geschaefte, activeId) {
  const history = [activeId]
  let idVorgeschaeft = getIdVorgeschaeft(geschaefte, activeId)
  if (idVorgeschaeft) history.unshift(idVorgeschaeft)

  while (idVorgeschaeft) {
    idVorgeschaeft = getIdVorgeschaeft(geschaefte, idVorgeschaeft)
    // need to prevent endless loop when two geschaefte set each other as vorgeschaeft
    if (idVorgeschaeft && !history.includes(idVorgeschaeft)) {
      history.unshift(idVorgeschaeft)
    }
    if (history.includes(idVorgeschaeft)) {
      idVorgeschaeft = null
    }
  }
  let idNachgeschaeft = getIdNachgeschaeft(geschaefte, activeId)
  if (idNachgeschaeft) history.push(idNachgeschaeft)
  while (idNachgeschaeft) {
    idNachgeschaeft = getIdNachgeschaeft(geschaefte, idNachgeschaeft)
    if (idNachgeschaeft) history.push(idNachgeschaeft)
  }
  return history
}
