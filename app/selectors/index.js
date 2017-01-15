import { createSelector } from 'reselect'
import clone from 'lodash/clone'

const getGeschaefte = (state) => state.geschaefte.geschaefte
const getGki = (state) => state.geschaefteKontakteIntern
const getGke = (state) => state.geschaefteKontakteExtern
const getInterne = (state) => state.geschaefte.interneOptions
const getExterne = (state) => state.geschaefte.externeOptions
const getGeko = (state) => state.geschaefte.geko

export const getGeschaefteWithNSideData = createSelector(
  [getGeschaefte, getGki, getGke, getInterne, getExterne, getGeko],
  (geschaefteInState, gki, gke, interne, externe, geko) => {
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
      return newGeschaeft
    })
    return geschaefte
  }
)
