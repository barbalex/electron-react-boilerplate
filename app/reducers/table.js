import {
  TABLE_GET,
  TABLE_GET_SUCCESS,
  TABLE_GET_ERROR,
  TABLE_ROW_TOGGLE_ACTIVATED,
  TABLE_ROW_DEACTIVATE,
  TABLE_ROW_DELETE,
  TABLE_ROW_SET_DELETE_INTENDED,
  TABLE_ROW_REMOVE_DELETE_INTENDED,
  TABLE_CHANGE_STATE,
  TABLE_CHANGE_DB_ERROR,
  TABLE_ROW_NEW,
  TABLE_RESET,
} from '../actions/table'

const standardState = {
  table: null,
  rows: [],
  fetching: false,
  // following: state for active row
  id: null,
  willDelete: false,
}

const row = (state = {}, action) => {
  switch (action.type) {
    case TABLE_CHANGE_STATE:
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        [action.field]: action.value,
      }
    default:
      return state
  }
}

const table = (state = standardState, action) => {
  switch (action.type) {
    case TABLE_GET:
      return {
        ...state,
        table: action.table,
        fetching: true,
        error: [],
      }
    case TABLE_GET_SUCCESS:
      return {
        ...state,
        table: action.table,
        fetching: false,
        error: [],
        rows: action.rows,
        id: null,
      }
    case TABLE_ROW_TOGGLE_ACTIVATED:
      return {
        ...state,
        id: (
          state.id && state.id === action.id ?
          null :
          action.id
        ),
      }
    case TABLE_ROW_DEACTIVATE:
      return {
        ...state,
        id: null,
      }
    case TABLE_ROW_SET_DELETE_INTENDED:
      return {
        ...state,
        willDelete: true,
      }
    case TABLE_ROW_REMOVE_DELETE_INTENDED:
      return {
        ...state,
        willDelete: false,
      }
    case TABLE_ROW_DELETE:
      return {
        ...state,
        rows: [
          ...state.rows.filter(g =>
            g.id !== action.id
          ),
        ],
      }
    case TABLE_CHANGE_STATE:
      return {
        ...state,
        rows: state.rows.map(g =>
          row(g, action)
        ),
      }
    case TABLE_ROW_NEW:
      return {
        ...state,
        rows: [...state.rows, action.row],
      }
    case TABLE_RESET:
      return {
        ...state,
        ...standardState,
      }
    case TABLE_GET_ERROR:
    case TABLE_CHANGE_DB_ERROR:
      return {
        ...state,
        fetching: false,
        error: [...state.error, action.error],
      }
    default:
      return state
  }
}

export default table
