import { createSelector } from 'reselect'
import _ from 'lodash'

import getDauerBisFristMitarbeiter from '../src/getDauerBisFristMitarbeiter'
import getFristMitarbeiterWarnung from '../src/getFristMitarbeiterWarnung'

const getGeschaefte = (state) =>
  state.geschaefte.geschaefte
const getGki = (state) =>
  state.geschaefteKontakteIntern.geschaefteKontakteIntern
const getGke = (state) =>
  state.geschaefteKontakteExtern.geschaefteKontakteExtern
const getInterne = (state) =>
  state.geschaefte.interneOptions
const getExterne = (state) =>
  state.geschaefte.externeOptions
const getGeko = (state) =>
  state.geschaefte.geko
const getLinks = (state) =>
  state.geschaefte.links
const getFaelligeStati = (state) =>
  state.geschaefte.faelligeStatiOptions

export const getGeschaefteWithNSideData = createSelector(  // eslint-disable-line import/prefer-default-export
  [getGeschaefte, getGki, getGke, getInterne, getExterne, getGeko, getLinks, getFaelligeStati],
  (geschaefte, gki, gke, interne, externe, geko, links, faelligeStati) =>
    geschaefte.map((g) => {
      const newGeschaeft = _.clone(g)
      newGeschaeft.verantwortlichName = interne
        .filter(i => i.kurzzeichen === newGeschaeft.verantwortlich)
        .map(i =>
          (i.name ? `${i.vorname} ${i.name}` : '')
        )
        .join(', ')
      newGeschaeft.interne = gki
        .filter(i => i.idGeschaeft === newGeschaeft.idGeschaeft)
        .map((gk) =>
          interne.find(i => i.id === gk.idKontakt) || null
        )
      newGeschaeft.verantwortlichItKonto = gki.find(i => i.kurzzeichen === g.verantwortlich)
      newGeschaeft.externe = gke
        .filter(i => i.idGeschaeft === newGeschaeft.idGeschaeft)
        .map((gk) =>
          externe.find(i => i.id === gk.idKontakt) || null
        )
      newGeschaeft.geko = geko
        .filter(gko => gko.idGeschaeft === newGeschaeft.idGeschaeft)
      newGeschaeft.links = links
        .filter(link => link.idGeschaeft === newGeschaeft.idGeschaeft)
      newGeschaeft.kannFaelligSein = faelligeStati.includes(g.status)
      newGeschaeft.dauerBisFristMitarbeiter = getDauerBisFristMitarbeiter(newGeschaeft)
      newGeschaeft.fristMitarbeiterWarnung = getFristMitarbeiterWarnung(newGeschaeft.dauerBisFristMitarbeiter)
      return newGeschaeft
    })
)
