import { push } from 'react-router-redux'

import { getGeschaefteWithNSideData } from '../selectors'

export const PAGES_STOP = 'PAGES_STOP'
export const pagesStop = () =>
  (dispatch) => {
    dispatch({
      type: PAGES_STOP
    })
    // dispatch(push('/geschaefte'))
  }

export const PAGES_MODAL_SHOW = 'PAGES_MODAL_SHOW'
export const pagesModalShow = (
  showPagesModal,
  modalTextLine1,
  modalTextLine2,
) => ({
  type: PAGES_MODAL_SHOW,
  showPagesModal,
  modalTextLine1,
  modalTextLine2,
})

export const PAGES_INITIATE = 'PAGES_INITIATE'
export const pagesInitiate = reportType =>
  (dispatch, getState) => {
    const state = getState()
    const geschaefte = getGeschaefteWithNSideData(state)
    const { geschaefteGefilterteIds } = state.geschaefte
    const geschaefteGefiltert = geschaefte.filter(g =>
      geschaefteGefilterteIds.includes(g.idGeschaeft)
    )

    dispatch({
      type: PAGES_INITIATE,
      reportType,
      geschaefteGefiltert
    })
    dispatch(push('/pages'))
  }

export const PAGES_FINISHED_BUILDING = 'PAGES_FINISHED_BUILDING'
export const pagesFinishedBuilding = () => ({
  type: PAGES_FINISHED_BUILDING
})

export const PAGES_QUERY_TITLE = 'PAGES_QUERY_TITLE'
export const pagesQueryTitle = queryTitle => ({
  type: PAGES_QUERY_TITLE,
  queryTitle
})

export const PAGES_SET_TITLE = 'PAGES_SET_TITLE'
export const pagesSetTitle = title => ({
  type: PAGES_SET_TITLE,
  title
})

export const PAGES_NEW_PAGE = 'PAGES_NEW_PAGE'
export const pagesNewPage = () => ({
  type: PAGES_NEW_PAGE
})

export const PAGE_ADD_GESCHAEFT = 'PAGE_ADD_GESCHAEFT'
export const pageAddGeschaeft = () => ({
  type: PAGE_ADD_GESCHAEFT
})

export const PAGE_REMOVE_GESCHAEFT = 'PAGE_REMOVE_GESCHAEFT'
export const pageRemoveGeschaeft = (pageIndex, geschaeft) => ({
  type: PAGE_REMOVE_GESCHAEFT,
  pageIndex,
  geschaeft
})

export const PAGE_MOVE_GESCHAEFT_TO_NEW_PAGE = 'PAGE_MOVE_GESCHAEFT_TO_NEW_PAGE'
export const pagesMoveGeschaeftToNewPage = geschaeft =>
  (dispatch, getState) => {
    const { pages } = getState()
    dispatch(pageRemoveGeschaeft(pages.activePageIndex, geschaeft))
    dispatch(pagesNewPage())
    dispatch(pageAddGeschaeft())
  }
