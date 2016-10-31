/**
 * watch versions of username:
 * did not work on 2.2.2
 * see: https://github.com/sindresorhus/username/issues/9
 */
import getMyName from 'username'

export const USERNAME_GET = 'USERNAME_GET'
export const USERNAME_GET_SUCCESS = 'USERNAME_GET_SUCCESS'
export const USERNAME_GET_ERROR = 'USERNAME_GET_ERROR'

export const getUsername = () => ({
  type: USERNAME_GET
})

export const gotUsername = username => ({
  type: USERNAME_GET_SUCCESS,
  username
})

export const didntGetUsername = error => ({
  type: USERNAME_GET_ERROR,
  error
})

export const fetchUsername = () =>
  (dispatch, getState) => {
    // first check if username has not yet been gotten
    const { user } = getState()
    if (!user.username) {
      const username = getMyName.sync()
      // console.log('actions.user.js, username', username)
      if (username) {
        dispatch(gotUsername(username))
      } else {
        dispatch(didntGetUsername('keinen Benutzernamen erhalten'))
      }
    }
  }
