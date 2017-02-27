/* eslint-disable no-param-reassign */
import { action } from 'mobx'
import { browserHistory } from 'react-router'

import getGeschaefteFromDb from '../../src/getGeschaefteFromDb'
import getGekoFromDb from '../../src/getGekoFromDb'
import getLinkFromDb from '../../src/getLinksFromDb'
import getDropdownOptions from '../../src/getDropdownOptions'
import getFaelligeStatiOptions from '../../src/getFaelligeStatiOptions'
import getInterneOptions from '../../src/getInterneOptions'
import getExterneOptions from '../../src/getExterneOptions'
import updateGeschaeft from '../../src/updateGeschaeft'
import updateGeko from '../../src/updateGeko'
import updateLink from '../../src/updateLink'
import filterGeschaefte from '../../src/filterGeschaefte'
import sortIdsBySortFields from '../../src/sortIdsBySortFields'
import newGeschaeftInDb from '../../src/newGeschaeftInDb'
import newGekoInDb from '../../src/newGekoInDb'
import newLinkInDb from '../../src/newLinkInDb'
import deleteGeschaeft from '../../src/deleteGeschaeft'
import deleteGeko from '../../src/deleteGeko'
import deleteLink from '../../src/deleteLink'


export default (store) => ({
  geschaefteKontakteExternGet: action(() => {
    store.geschaefteKontakteExtern.fetching = true
    store.geschaefteKontakteExtern.error = []
  }),
})
