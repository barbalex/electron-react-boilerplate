import { createSelector } from 'reselect'
import clone from 'lodash/clone'

const getGeschaefte = (state) => state.geschaefte.geschaefte
const getGki = (state) => state.geschaefteKontakteIntern.geschaefteKontakteIntern
const getGke = (state) => state.geschaefteKontakteExtern.geschaefteKontakteExtern
const getInterne = (state) => state.geschaefte.interneOptions
const getExterne = (state) => state.geschaefte.externeOptions
const getGeko = (state) => state.geschaefte.geko
const getLinks = (state) => state.geschaefte.links

export const getGeschaefteWithNSideData = createSelector(
  [getGeschaefte, getGki, getGke, getInterne, getExterne, getGeko, getLinks],
  (geschaefteInState, gki, gke, interne, externe, geko, links) => {
    // attach all arrays to each geschaeft
    const geschaefte = geschaefteInState.map((g) => {
      const newGeschaeft = clone(g)
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
      return newGeschaeft
    })
    return geschaefte
  }
)
