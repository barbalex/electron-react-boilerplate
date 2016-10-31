import { push } from 'react-router-redux'

export const PAGES_INITIATE = 'PAGES_INITIATE'
export const pagesInitiate = reportType =>
  (dispatch, getState) => {
    const { geschaefte } = getState()
    const { geschaefteGefilterteIds } = geschaefte
    const geschaefteGefiltert = geschaefte.geschaefte.filter(g =>
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
