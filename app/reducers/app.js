import {
  DB_CHOOSE,
  DB_CHOOSE_SUCCESS,
  DB_CHOOSE_ERROR,
  MESSAGE_SHOW,
  CONFIG_GET,
  CONFIG_SET,
  CONFIG_SET_KEY,
} from '../actions/app'

const standardState = {
  fetchingDb: false,
  errorFetchingDb: null,
  db: null,
  showMessageModal: false,
  messageTextLine1: '',
  messageTextLine2: '',
  config: {
    dbPath: '',
    tableColumnWidth: 700,
    geschaefteColumnWidth: 400,
  },
}

const app = (state = standardState, action) => {
  switch (action.type) {
    case CONFIG_GET:
    case CONFIG_SET:
      return {
        ...state,
        config: action.config,
      }
    case CONFIG_SET_KEY:
      return {
        ...state,
        config: Object.assign(
          {},
          state.config,
          { [action.key]: action.value },
        ),
      }
    case MESSAGE_SHOW:
      return {
        ...state,
        showMessageModal: action.showMessageModal,
        messageTextLine1: action.messageTextLine1,
        messageTextLine2: action.messageTextLine2,
      }
    case DB_CHOOSE:
      return {
        ...state,
        fetchingDb: true,
        errorFetchingDb: null,
      }
    case DB_CHOOSE_SUCCESS:
      return {
        ...state,
        fetchingDb: false,
        errorFetchingDb: null,
        db: action.db,
        config: Object.assign(
          {},
          state.config,
          { dbPath: action.dbPath },
        ),
      }
    case DB_CHOOSE_ERROR:
      return {
        ...state,
        fetchingDb: false,
        errorFetchingDb: action.error,
        db: null,
      }
    default:
      return state
  }
}

export default app
