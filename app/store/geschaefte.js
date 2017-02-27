import { extendObservable } from 'mobx'

import geschaefteStandardState from '../src/geschaefteStandardState'

const geschaefte = {}
extendObservable(geschaefte, geschaefteStandardState)

export default geschaefte
