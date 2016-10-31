import _ from 'lodash'
import moment from 'moment'
import isDateField from './isDateField'

export default (geschaeftePassed, geschaefteGefilterteIds, sortFields) => {
  let geschaefte
  // 1. sort
  sortFields.forEach((sf) => {
    geschaefte = _.sortBy(geschaeftePassed, (g) => {
      if (g[sf.field]) {
        if (isDateField(sf.field)) {
          // need to reformat date
          return moment(g[sf.field], 'DD.MM.YYYY').format('YYYY-MM-DD')
        }
        return g[sf.field]
      }
      return 'ZZZZ'
    })
    if (sf.direction === 'DESCENDING') {
      geschaefte = geschaefte.reverse()
    }
  })
  if (sortFields.length === 0) {
    geschaefte = _.sortBy(geschaeftePassed, 'idGeschaeft').reverse()
  }
  // 2. filter
  geschaefte = geschaefte.filter(g => geschaefteGefilterteIds.includes(g.idGeschaeft))
  // 3. map ids
  geschaefte = geschaefte.map(g => g.idGeschaeft)
  return geschaefte
}
