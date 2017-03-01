/* eslint-disable no-param-reassign */
import { action } from 'mobx'

import pageStandardState from '../../src/pageStandardState'

export default (store) => ({
  pagesStop: action(() => {
    store.pages.remainingGeschaefte = []
    store.pages.building = false
  }),
  pagesModalShow: action((showPagesModal, modalTextLine1, modalTextLine2) => {
    store.pages.showPagesModal = showPagesModal
    store.pages.modalTextLine1 = modalTextLine1
    store.pages.modalTextLine2 = modalTextLine2
  }),
  pagesInitiate: action((reportType) => {
    const state = store
    const { geschaefte } = store.geschaefte
    const { geschaefteGefilterteIds } = state.geschaefte
    const geschaefteGefiltert = geschaefte.filter(g =>
      geschaefteGefilterteIds.includes(g.idGeschaeft)
    )
    store.pages.reportType = reportType
    store.pages.remainingGeschaefte = geschaefteGefiltert
    store.pages.building = true
    store.history.push('/pages')
  }),
  pagesFinishedBuilding: action(() => {
    store.pages.building = false
  }),
  pagesQueryTitle: action((queryTitle) => {
    store.pages.queryTitle = queryTitle
  }),
  pagesSetTitle: action((title) => {
    store.pages.title = title
  }),
  pagesNewPage: action(() => {
    store.pages.activePageIndex += 1
    store.pages.pages.push(Object.assign(pageStandardState))
  }),
  pageAddGeschaeft: action(() => {
    if (store.pages.building) {
      const activePage = store.pages.pages.find(p =>
        p.pageIndex === store.pages.activePageIndex
      )
      if (activePage) {
        activePage.geschaefte.push(store.pages.remainingGeschaefte.shift())
      }
    }
  }),
  pageRemoveGeschaeft: action((pageIndex, geschaeft) => {
    if (store.pages.building) {
      const activePage = store.pages.pages.find(p =>
        p.pageIndex === pageIndex
      )
      if (activePage) {
        activePage.geschaefte = activePage.geschaefte.filter(g =>
          g.idGeschaeft !== geschaeft.idGeschaeft
        )
        activePage.full = true
        store.pages.remainingGeschaefte.push(geschaeft)
      }
    }
  }),
  pagesMoveGeschaeftToNewPage: action((geschaeft) => {
    const { pages } = store
    store.pageRemoveGeschaeft(pages.activePageIndex, geschaeft)
    store.pagesNewPage()
    store.pageAddGeschaeft()
  }),
})
