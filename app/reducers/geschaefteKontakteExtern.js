import {
  GESCHAEFTE_KONTAKTE_EXTERN_GET,
  GESCHAEFTE_KONTAKTE_EXTERN_GET_SUCCESS,
  GESCHAEFTE_KONTAKTE_EXTERN_GET_ERROR,
  GESCHAEFT_KONTAKT_EXTERN_TOGGLE_ACTIVATED,
  GESCHAEFT_KONTAKT_EXTERN_DELETE,
  GESCHAEFT_KONTAKT_EXTERN_SET_DELETE_INTENDED,
  GESCHAEFT_KONTAKT_EXTERN_REMOVE_DELETE_INTENDED,
  GESCHAEFT_KONTAKT_EXTERN_NEW,
} from '../actions/geschaefteKontakteExtern'

const standardState = {
  fetching: false,
  error: [],
  geschaefteKontakteExtern: [],
  // state for active geschaeftKontaktExtern:
  activeIdGeschaeft: null,
  activeIdKontakt: null,
  willDelete: false,
}

const geschaefteKontakteExtern = (state = standardState, action) => {
  switch (action.type) {
    case GESCHAEFTE_KONTAKTE_EXTERN_GET:
      return {
        ...state,
        fetching: true,
        error: [],
      }
    case GESCHAEFTE_KONTAKTE_EXTERN_GET_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: [],
        geschaefteKontakteExtern: action.geschaefteKontakteExtern,
      }
    case GESCHAEFTE_KONTAKTE_EXTERN_GET_ERROR:
      return {
        ...state,
        fetching: false,
        error: [...state.error, action.error],
      }
    case GESCHAEFT_KONTAKT_EXTERN_TOGGLE_ACTIVATED:
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
    case GESCHAEFT_KONTAKT_EXTERN_SET_DELETE_INTENDED:
      return {
        ...state,
        willDelete: true,
        activeIdGeschaeft: action.idGeschaeft,
        activeIdKontakt: action.idKontakt,
      }
    case GESCHAEFT_KONTAKT_EXTERN_REMOVE_DELETE_INTENDED:
      return {
        ...state,
        willDelete: false,
      }
    case GESCHAEFT_KONTAKT_EXTERN_DELETE:
      return {
        ...state,
        geschaefteKontakteExtern: [
          ...state.geschaefteKontakteExtern.filter(g =>
            (
              g.idGeschaeft !== action.idGeschaeft ||
              g.idKontakt !== action.idKontakt
            )
          )
        ],
        activeIdGeschaeft: null,
        activeIdKontakt: null,
      }
    case GESCHAEFT_KONTAKT_EXTERN_NEW:
      return {
        ...state,
        geschaefteKontakteExtern: [
          action.geschaeftKontaktExtern,
          ...state.geschaefteKontakteExtern,
        ],
      }
    default:
      return state
  }
}

export default geschaefteKontakteExtern
