import {
  PAGES_STOP,
  PAGES_NEW_PAGE,
  PAGES_SET_TITLE,
  PAGES_INITIATE,
  PAGES_QUERY_TITLE,
  PAGES_FINISHED_BUILDING,
  PAGE_ADD_GESCHAEFT,
  PAGE_REMOVE_GESCHAEFT,
} from '../actions/pages'

const standardPageState = {
  geschaefte: [],
  full: false,
}

const standardPagesState = {
  pages: [Object.assign(standardPageState)],
  activePageIndex: 0,
  remainingGeschaefte: [],
  title: '',
  queryTitle: true,
  reportType: 'fristen',
  building: false,
}

const page = (
  state,
  action,
  pagesState,
  pageIndex,
) => {
  switch (action.type) {
    case PAGES_STOP:
      return {
        remainingGeschaefte: [],
        building: false,
      }
    case PAGE_ADD_GESCHAEFT:
      if (pageIndex === pagesState.activePageIndex && pagesState.building) {
        const geschaefte = [
          ...state.geschaefte,
          pagesState.remainingGeschaefte[0],
        ]
        return {
          ...state,
          geschaefte,
        }
      }
      return state
    case PAGE_REMOVE_GESCHAEFT:
      if (pageIndex === action.pageIndex && pagesState.building) {
        const geschaefte = state.geschaefte.filter(g =>
          g.idGeschaeft !== action.geschaeft.idGeschaeft
        )
        const full = true
        return {
          ...state,
          geschaefte,
          full,
        }
      }
      return state
    default:
      return state
  }
}

const pages = (state = standardPagesState, action) => {
  switch (action.type) {
    case PAGES_INITIATE:
      return {
        ...standardPagesState,
        reportType: action.reportType,
        remainingGeschaefte: action.geschaefteGefiltert,
        building: true,
      }
    case PAGES_QUERY_TITLE:
      return {
        ...state,
        queryTitle: action.queryTitle,
      }
    case PAGES_SET_TITLE:
      return {
        ...state,
        title: action.title,
      }
    case PAGES_NEW_PAGE:
      return {
        ...state,
        activePageIndex: state.activePageIndex + 1,
        pages: [
          ...state.pages,
          Object.assign(standardPageState),
        ],
      }
    case PAGE_ADD_GESCHAEFT:
      if (state.building) {
        return {
          ...state,
          pages: state.pages.map((p, pageIndex) =>
            page(p, action, state, pageIndex)
          ),
          remainingGeschaefte: state.remainingGeschaefte.filter(
            (g, index) => index !== 0
          ),
        }
      }
      return state
    case PAGE_REMOVE_GESCHAEFT:
      if (state.building) {
        return {
          ...state,
          pages: state.pages.map((p, pageIndex) =>
            page(p, action, state, pageIndex)
          ),
          remainingGeschaefte: [
            action.geschaeft,
            ...state.remainingGeschaefte,
          ],
        }
      }
      return state
    case PAGES_FINISHED_BUILDING:
      return {
        ...state,
        building: false,
      }
    default:
      return state
  }
}

export default pages
