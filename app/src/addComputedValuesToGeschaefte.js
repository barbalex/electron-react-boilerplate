/* eslint-disable no-param-reassign */
import getDauerBisFristMitarbeiter from './getDauerBisFristMitarbeiter'
import getFristMitarbeiterWarnung from './getFristMitarbeiterWarnung'
import getItKontoForVerantwortlich from './getItKontoForVerantwortlich'

export default (store) =>
  store.geschaefte.geschaefte.map((g) => {
    const { interneOptions, externeOptions, geko, links, faelligeStatiOptions } = store.geschaefte
    const interne = store.geschaefteKontakteIntern.geschaefteKontakteIntern
    const externe = store.geschaefteKontakteExtern.geschaefteKontakteExtern
    g.verantwortlichName = interneOptions
      .filter(i => i.kurzzeichen === g.verantwortlich)
      .map(i =>
        (i.name ? `${i.vorname ? `${i.vorname} ` : ''}${i.name}` : '')
      )
      .join(', ')
    g.interne = interne
      .filter(i => i.idGeschaeft === g.idGeschaeft)
      .map((gk) =>
        interneOptions.find(i => i.id === gk.idKontakt) || null
      )
    g.externe = externe
      .filter(i => i.idGeschaeft === g.idGeschaeft)
      .map((gk) =>
        externeOptions.find(i => i.id === gk.idKontakt) || null
      )
    g.verantwortlichItKonto = getItKontoForVerantwortlich(store.geschaefte.interneOptions, g.verantwortlich)
    g.geko = geko
      .filter(gko => gko.idGeschaeft === g.idGeschaeft)
    g.links = links
      .filter(link => link.idGeschaeft === g.idGeschaeft)
    g.kannFaelligSein = faelligeStatiOptions ? faelligeStatiOptions.includes(g.status) : false
    g.dauerBisFristMitarbeiter = getDauerBisFristMitarbeiter(g)
    g.fristMitarbeiterWarnung = getFristMitarbeiterWarnung(g.dauerBisFristMitarbeiter)
    return g
  })
