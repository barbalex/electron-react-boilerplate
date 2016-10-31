import React, { PropTypes } from 'react'
import styles from './areaHistory.css'
import getHistoryOfGeschaeft from '../../src/getHistoryOfGeschaeft'

const AreaHistoryRows = ({
  geschaefte,
  activeId,
  geschaeftToggleActivated,
}) => {
  const history = getHistoryOfGeschaeft(geschaefte, activeId)
  // sort descending
  history.reverse()
  return (
    <div className={styles.areaHistoryFieldsContainer}>
      {
        history.map((id, index) => {
          const geschaeft = geschaefte.find(g =>
            g.idGeschaeft === id
          )
          if (!geschaeft) {
            return null
          }
          return (
            <div
              key={index}
              className={styles.areaHistoryFields}
              style={{
                cursor: id === activeId ? 'default' : 'pointer'
              }}
              onClick={() => {
                if (id !== activeId) {
                  return geschaeftToggleActivated(id)
                }
              }}
            >
              <div className={styles.historyIdGeschaeft}>
                {id}
              </div>
              <div className={styles.historyGegenstand}>
                {geschaeft.gegenstand}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

AreaHistoryRows.displayName = 'AreaHistoryRows'

AreaHistoryRows.propTypes = {
  geschaefte: PropTypes.array.isRequired,
  activeId: PropTypes.number.isRequired,
  geschaeftToggleActivated: PropTypes.func.isRequired,
}

export default AreaHistoryRows
