import {
  GESCHAEFTE_KONTAKTE_INTERN_GET,
  GESCHAEFTE_KONTAKTE_INTERN_GET_SUCCESS,
  GESCHAEFTE_KONTAKTE_INTERN_GET_ERROR,
  GESCHAEFT_KONTAKT_INTERN_TOGGLE_ACTIVATED,
  GESCHAEFT_KONTAKT_INTERN_DELETE,
  GESCHAEFT_KONTAKT_INTERN_SET_DELETE_INTENDED,
  GESCHAEFT_KONTAKT_INTERN_REMOVE_DELETE_INTENDED,
  GESCHAEFT_KONTAKT_INTERN_NEW,
} from '../actions/geschaefteKontakteIntern'

const standardState = {
  fetching: false,
  error: [],
  geschaefteKontakteIntern: [],
  // state for active geschaeftKontaktIntern:
  activeIdGeschaeft: null,
  activeIdKontakt: null,
  willDelete: false,
}

const geschaefteKontakteIntern = (state = standardState, action) => {
  switch (action.type) {
    case GESCHAEFTE_KONTAKTE_INTERN_GET:
      return {
        ...state,
        fetching: true,
        error: [],
      }
    case GESCHAEFTE_KONTAKTE_INTERN_GET_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: [],
        geschaefteKontakteIntern: action.geschaefteKontakteIntern,
      }
    case GESCHAEFTE_KONTAKTE_INTERN_GET_ERROR:
      return {
        ...state,
        fetching: false,
        error: [...state.error, action.error],
      }
    case GESCHAEFT_KONTAKT_INTERN_TOGGLE_ACTIVATED:
      return {
        ...state,
        activeIdGeschaeft: (
          state.activeIdGeschaeft && state.activeIdGeschaeft === action.activeIdGeschaeft ?
          null :
          action.activeIdGeschaeft
        ),
        activeIdKontakt: (
          state.activeIdKontakt && state.activeIdKontakt === action.activeIdKontakt ?
          null :
          action.activeIdKontakt
        ),
      }
    case GESCHAEFT_KONTAKT_INTERN_SET_DELETE_INTENDED:
      return {
        ...state,
        willDelete: true,
        activeIdGeschaeft: action.idGeschaeft,
        activeIdKontakt: action.idKontakt,
      }
    case GESCHAEFT_KONTAKT_INTERN_REMOVE_DELETE_INTENDED:
      return {
        ...state,
        willDelete: false,
      }
    case GESCHAEFT_KONTAKT_INTERN_DELETE:
      return {
        ...state,
        geschaefteKontakteIntern: [...state.geschaefteKontakteIntern.filter(g =>
          (g.idGeschaeft !== action.idGeschaeft || g.idKontakt !== action.idKontakt))
        ],
        activeIdGeschaeft: null,
        activeIdKontakt: null,
      }
    case GESCHAEFT_KONTAKT_INTERN_NEW:
      return {
        ...state,
        geschaefteKontakteIntern: [
          action.geschaeftKontaktIntern,
          ...state.geschaefteKontakteIntern,
        ],
      }
    default:
      return state
  }
}

export default geschaefteKontakteIntern
