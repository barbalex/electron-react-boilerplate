import React, { PropTypes } from 'react'
import styles from './areaZuletztMutiert.css'

const AreaZuletztMutiert = ({
  geschaeft,
  interneOptions,
}) => {
  let zuletztMutiertText

  if (!geschaeft.mutationsperson) {
    zuletztMutiertText = 'Bei diesem Geschäft wurde (noch) keine Mutationsperson gespeichert'
  } else {
    const mutPersonOptions = interneOptions.find((o) => {
      if (o.itKonto) {
        // seems that data contains lower case differences
        // and whitespace
        return (
          o.itKonto.toLowerCase().replace(/ /g, '') ===
          geschaeft.mutationsperson.toLowerCase().replace(/ /g, '')
        )
      }
      return false
    })
    const name = (
      mutPersonOptions ?
      ` (${mutPersonOptions.vorname} ${mutPersonOptions.name})` :
      ''
    )
    zuletztMutiertText = `Zuletzt mutiert durch ${geschaeft.mutationsperson}${name} am ${geschaeft.mutationsdatum}`
  }

  return (
    <div className={styles.areaZuletztMutiert}>
      <div className={styles.fieldZuletztMutiert}>
        {zuletztMutiertText}
      </div>
    </div>
  )
}

AreaZuletztMutiert.displayName = 'AreaZuletztMutiert'

AreaZuletztMutiert.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  interneOptions: PropTypes.array,
}

export default AreaZuletztMutiert
