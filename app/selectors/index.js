import { createSelector } from 'reselect'
import _ from 'lodash'
import getHistoryOfGeschaeft from '../src/getHistoryOfGeschaeft'

const getGeschaefte = (state) => state.geschaefte.geschaefte
const getActiveId = (state) => state.geschaefte.activeId
const getGki = (state) => state.geschaefteKontakteIntern.geschaefteKontakteIntern
const getGke = (state) => state.geschaefteKontakteExtern.geschaefteKontakteExtern
const getInterne = (state) => state.geschaefte.interneOptions
const getExterne = (state) => state.geschaefte.externeOptions
const getGeko = (state) => state.geschaefte.geko
const getLinks = (state) => state.geschaefte.links

export const getGeschaefteWithNSideData = createSelector(
  [getGeschaefte, getActiveId, getGki, getGke, getInterne, getExterne, getGeko, getLinks],
  (geschaefte, activeId, gki, gke, interne, externe, geko, links) =>
    geschaefte.map((g) => {
      const newGeschaeft = _.clone(g)
      newGeschaeft.interne = gki
        .filter(i => i.idGeschaeft === g.idGeschaeft)
        .map((gk) =>
          interne.find(i => i.id === gk.idKontakt) || null
        )
      newGeschaeft.externe = gke
        .filter(i => i.idGeschaeft === g.idGeschaeft)
        .map((gk) =>
          externe.find(i => i.id === gk.idKontakt) || null
        )
      newGeschaeft.geko = geko
        .filter(gko => gko.idGeschaeft === g.idGeschaeft)
      newGeschaeft.links = links
        .filter(link => link.idGeschaeft === g.idGeschaeft)
      // newGeschaeft.history = getHistoryOfGeschaeft(geschaefte, activeId)
      return newGeschaeft
    })
)
