import { createSelector } from 'reselect'
import _ from 'lodash'

const getGeschaefte = (state) => state.geschaefte.geschaefte
const getGki = (state) => state.geschaefteKontakteIntern.geschaefteKontakteIntern
const getGke = (state) => state.geschaefteKontakteExtern.geschaefteKontakteExtern
const getInterne = (state) => state.geschaefte.interneOptions
const getExterne = (state) => state.geschaefte.externeOptions
const getGeko = (state) => state.geschaefte.geko
const getLinks = (state) => state.geschaefte.links

export const getGeschaefteWithNSideData = createSelector(
  [getGeschaefte, getGki, getGke, getInterne, getExterne, getGeko, getLinks],
  (geschaefte, gki, gke, interne, externe, geko, links) =>
    geschaefte.map((g) => {
      const newGeschaeft = _.clone(g)
      newGeschaeft.interne = gki
        .filter(i => i.idGeschaeft === newGeschaeft.idGeschaeft)
        .map((gk) =>
          interne.find(i => i.id === gk.idKontakt) || null
        )
      newGeschaeft.externe = gke
        .filter(i => i.idGeschaeft === newGeschaeft.idGeschaeft)
        .map((gk) =>
          externe.find(i => i.id === gk.idKontakt) || null
        )
      newGeschaeft.geko = geko
        .filter(gko => gko.idGeschaeft === newGeschaeft.idGeschaeft)
      newGeschaeft.links = links
        .filter(link => link.idGeschaeft === newGeschaeft.idGeschaeft)
      /*
      newGeschaeft.vorgeschaeft = geschaefte
        .find(vg =>
          vg.idGeschaeft === parseInt(newGeschaeft.idVorgeschaeft, 10)
        )
      newGeschaeft.nachgeschaeft = geschaefte
        .find(ng =>
          parseInt(ng.idVorgeschaeft, 10) === newGeschaeft.idGeschaeft
        )
      */
      return newGeschaeft
    })
)
