import moment from 'moment'
import _ from 'lodash'
import geschaefteSortByFieldsGetSortFields from './geschaefte/geschaefteSortByFieldsGetSortFields'
import sortIdsBySortFields from '../src/sortIdsBySortFields'

import {
  GESCHAEFTE_GET,
  GESCHAEFTE_GET_SUCCESS,
  GESCHAEFTE_GET_ERROR,
  GESCHAEFTE_FILTER_BY_FIELDS,
  GESCHAEFTE_SORT_BY_FIELDS,
  GESCHAEFTE_RESET_SORT,
  GESCHAEFTE_FILTER_BY_FULLTEXT,
  GESCHAEFTE_REMOVE_FILTERS,
  GESCHAEFT_TOGGLE_ACTIVATED,
  GESCHAEFT_DELETE,
  GESCHAEFT_SET_DELETE_INTENDED,
  GESCHAEFT_REMOVE_DELETE_INTENDED,
  GESCHAEFTE_CHANGE_STATE,
  GESCHAEFTE_CHANGE_DB_ERROR,
  GESCHAEFT_NEW,
  RECHTSMITTELERLEDIGUNG_OPTIONS_GET_SUCCESS,
  RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR,
  PARLVORSTOSSTYP_OPTIONS_GET_SUCCESS,
  PARLVORSTOSSTYP_OPTIONS_GET_ERROR,
  STATUS_OPTIONS_GET_SUCCESS,
  STATUS_OPTIONS_GET_ERROR,
  GESCHAEFTSART_OPTIONS_GET_SUCCESS,
  GESCHAEFTSART_OPTIONS_GET_ERROR,
  RECHTSMITTEL_INSTANZ_OPTIONS_GET_SUCCESS,
  RECHTSMITTEL_INSTANZ_OPTIONS_GET_ERROR,
  ABTEILUNG_OPTIONS_GET_SUCCESS,
  ABTEILUNG_OPTIONS_GET_ERROR,
  INTERNE_OPTIONS_GET_SUCCESS,
  INTERNE_OPTIONS_GET_ERROR,
  EXTERNE_OPTIONS_GET_SUCCESS,
  EXTERNE_OPTIONS_GET_ERROR,
} from '../actions/geschaefte'

const standardState = {
  fetching: false,
  error: [],
  geschaefte: [],
  geschaefteGefilterteIds: [],
  filterFields: [],
  filterFulltext: '',
  filterType: null,
  sortFields: [],
  // dropdown lists
  rechtsmittelErledigungOptions: [],
  parlVorstossTypOptions: [],
  statusOptions: [],
  geschaeftsartOptions: [],
  interneOptions: [],
  externeOptions: [],
  // following: state for active geschaeft
  activeId: null,
  willDelete: false,
}

const geschaeft = (state = {}, action) => {
  switch (action.type) {
    case GESCHAEFTE_CHANGE_STATE:
      if (state.idGeschaeft !== action.idGeschaeft) {
        return state
      }
      return {
        ...state,
        [action.field]: action.value,
        mutationsperson: action.username,
        mutationsdatum: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
    default:
      return state
  }
}

const geschaefte = (state = standardState, action) => {
  switch (action.type) {
    case GESCHAEFTE_GET:
      return {
        ...state,
        fetching: true,
        error: [],
      }
    case GESCHAEFTE_GET_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: [],
        geschaefte: action.geschaefte,
        geschaefteGefilterteIds: action.geschaefteGefilterteIds,
      }
    case GESCHAEFTE_GET_ERROR:
      return {
        ...state,
        fetching: false,
        error: [...state.error, action.error],
      }
    case GESCHAEFTE_FILTER_BY_FIELDS:
      return {
        ...state,
        filterFields: action.filterFields,
        filterFulltext: '',
        filterType: action.filterType || null,
        activeId: null,
        geschaefteGefilterteIds: action.geschaefteGefilterteIds,
      }
    case GESCHAEFTE_SORT_BY_FIELDS: {
      const sortFields = geschaefteSortByFieldsGetSortFields(state, action)
      const geschaefteGefilterteIds = sortIdsBySortFields(
        state.geschaefte,
        state.geschaefteGefilterteIds,
        sortFields
      )
      return {
        ...state,
        geschaefteGefilterteIds,
        sortFields,
      }
    }
    case GESCHAEFTE_RESET_SORT:
      return {
        ...state,
        sortFields: []
      }
    case GESCHAEFTE_FILTER_BY_FULLTEXT:
      return {
        ...state,
        geschaefteGefilterteIds: action.geschaefteGefilterteIds,
        filterType: action.filterType || null,
        filterFulltext: action.filterFulltext,
        filterFields: [],
        activeId: null,
      }
    case GESCHAEFTE_REMOVE_FILTERS:
      return {
        ...state,
        geschaefteGefilterteIds: _.sortBy(state.geschaefte, g => g.idGeschaeft)
          .reverse()
          .map(g =>
            g.idGeschaeft
          ),
        filterFields: [],
        filterType: null,
        filterFulltext: '',
        sortFields: [],
      }
    case GESCHAEFT_TOGGLE_ACTIVATED:
      return {
        ...state,
        activeId: (
          state.activeId && state.activeId === action.idGeschaeft ?
          null :
          action.idGeschaeft
        ),
      }
    case GESCHAEFT_SET_DELETE_INTENDED:
      return {
        ...state,
        willDelete: true,
      }
    case GESCHAEFT_REMOVE_DELETE_INTENDED:
      return {
        ...state,
        willDelete: false,
      }
    case GESCHAEFT_DELETE:
      return {
        ...state,
        geschaefte: [
          ...state.geschaefte.filter(g =>
            g.idGeschaeft !== action.idGeschaeft
          )
        ],
        geschaefteGefilterteIds: [
          ...state.geschaefteGefilterteIds.filter(id =>
            id !== action.idGeschaeft
          )
        ],
        activeId: null,
      }
    case GESCHAEFTE_CHANGE_STATE:
      return {
        ...state,
        geschaefte: state.geschaefte.map(g =>
          geschaeft(g, action)
        ),
      }
    case GESCHAEFT_NEW:
      /**
       * need to add new id to geschaefteGefilterteIds
       */
      return {
        ...state,
        geschaefte: [
          action.geschaeft,
          ...state.geschaefte,
        ],
        geschaefteGefilterteIds: [
          action.geschaeft.idGeschaeft,
          ...state.geschaefteGefilterteIds,
        ],
      }
    case RECHTSMITTELERLEDIGUNG_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        rechtsmittelErledigungOptions: action.rechtsmittelErledigungOptions,
      }
    case PARLVORSTOSSTYP_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        parlVorstossTypOptions: action.parlVorstossTypOptions,
      }
    case STATUS_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        statusOptions: action.statusOptions,
      }
    case GESCHAEFTSART_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        geschaeftsartOptions: action.geschaeftsartOptions,
      }
    case RECHTSMITTEL_INSTANZ_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        rechtsmittelInstanzOptions: action.rechtsmittelInstanzOptions,
      }
    case ABTEILUNG_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        abteilungOptions: action.abteilungOptions,
      }
    case INTERNE_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        interneOptions: action.interneOptions,
      }
    case EXTERNE_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        externeOptions: action.externeOptions,
      }
    case RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR:
    case PARLVORSTOSSTYP_OPTIONS_GET_ERROR:
    case STATUS_OPTIONS_GET_ERROR:
    case GESCHAEFTSART_OPTIONS_GET_ERROR:
    case RECHTSMITTEL_INSTANZ_OPTIONS_GET_ERROR:
    case ABTEILUNG_OPTIONS_GET_ERROR:
    case INTERNE_OPTIONS_GET_ERROR:
    case EXTERNE_OPTIONS_GET_ERROR:
    case GESCHAEFTE_CHANGE_DB_ERROR:
      return {
        ...state,
        error: [...state.error, action.error],
      }
    default:
      return state
  }
}

export default geschaefte
