import { includes, isString } from 'lodash'

export default (geschaefte, filterFulltext) =>
  geschaefte.filter((geschaeft) => {
    // if any value satisfies the filter, include the geschaeft
    let satisfiesFilter = false
    Object.keys(geschaeft).forEach((key) => {
      // there are lots of empty fields
      // don't work on them
      if (geschaeft[key]) {
        if (isNaN(filterFulltext)) {
          // a string is queried
          const geschaeftValue = (
            isString(geschaeft[key]) ?
            geschaeft[key].toLowerCase() :
            geschaeft[key]
          )
          const filterValue = (
            isString(filterFulltext) ?
            filterFulltext.toLowerCase() :
            filterFulltext
          )
          if (includes(geschaeftValue, filterValue)) {
            satisfiesFilter = true
          }
        } else {
          // a number is queried
          // convert to string to also find 7681 when filtering for 681
          if (includes(geschaeft[key].toString(), filterFulltext.toString())) {  // eslint-disable-line no-lonely-if
            satisfiesFilter = true
          }
        }
      }
    })
    return satisfiesFilter
  })
