import getIdVorgeschaeft from './getIdVorgeschaeft'
import getIdNachgeschaeft from './getIdNachgeschaeft'

export default function (geschaefte, activeId) {
  console.log('getHistoryOfGeschaeft: geschaefte:', geschaefte)
  console.log('getHistoryOfGeschaeft: activeId:', activeId)
  const history = activeId ? [activeId] : []
  console.log('getHistoryOfGeschaeft: history initial:', history)
  let idVorgeschaeft = getIdVorgeschaeft(geschaefte, activeId)
  if (idVorgeschaeft) history.unshift(idVorgeschaeft)

  while (idVorgeschaeft) {
    idVorgeschaeft = getIdVorgeschaeft(geschaefte, idVorgeschaeft)
    console.log('getHistoryOfGeschaeft: idVorgeschaeft initial:', idVorgeschaeft)
    // need to prevent endless loop when two geschaefte set each other as vorgeschaeft
    if (idVorgeschaeft && !history.includes(idVorgeschaeft)) {
      history.unshift(idVorgeschaeft)
    }
    if (history.includes(idVorgeschaeft)) {
      idVorgeschaeft = null
    }
  }
  let idNachgeschaeft = getIdNachgeschaeft(geschaefte, activeId)
  console.log('getHistoryOfGeschaeft: idNachgeschaeft initial:', idNachgeschaeft)
  if (idNachgeschaeft) history.push(idNachgeschaeft)
  while (idNachgeschaeft) {
    idNachgeschaeft = getIdNachgeschaeft(geschaefte, idNachgeschaeft)
    if (idNachgeschaeft) history.push(idNachgeschaeft)
  }
  return history
}
