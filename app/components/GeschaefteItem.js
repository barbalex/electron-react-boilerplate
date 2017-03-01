import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import styles from './Geschaefte.css'

const getStatusFristInStyle = (fristMitarbeiterWarnung) => {
  if (fristMitarbeiterWarnung === 'FÄLLIG') return styles.fieldWarnungFaellig
  if (fristMitarbeiterWarnung === 'HEUTE') return styles.fieldWarnungHeute
  return null
}

const enhance = compose(
  inject('store'),
  observer
)

const GeschaefteItem = ({
  store,
  index,
  keyPassed,
}) => {
  const {
    activeId,
    geschaeftePlusFilteredAndSorted: geschaefte,
  } = store.geschaefte
  const { geschaeftToggleActivated } = store
  const path = window.location.pathname
  const geschaeft = geschaefte[index]
  const isActive = (
    activeId &&
    activeId === geschaeft.idGeschaeft
  )
  const trClassName = (
    isActive ?
    [styles.tableBodyRow, styles.active].join(' ') :
    styles.tableBodyRow
  )
  // make sure geschaeft exists
  if (!geschaeft) return null
  const fristMitarbeiter = (
    geschaeft.fristMitarbeiter ?
    `Frist: ${geschaeft.fristMitarbeiter}` :

    ''
  )

  return (
    <div  // eslint-disable-line jsx-a11y/no-static-element-interactions
      key={keyPassed}
      className={trClassName}
      onClick={() => {
        // if path is not '/geschaefte', make it that
        // because this is also called from '/fieldFilter'
        // no idea why but using 'router' passed by 'withRouter' did not work here
        if (path === '/filterFields') {
          hashHistory.push('/geschaefte')
        }
        geschaeftToggleActivated(geschaeft.idGeschaeft)
      }}
    >
      <div className={styles.bodyColumnIdGeschaeft}>
        <div>
          {geschaeft.idGeschaeft}
        </div>
      </div>
      <div className={styles.bodyColumnGegenstand}>
        <div className={styles.fieldGegenstand}>
          {geschaeft.gegenstand}
        </div>
      </div>
      <div className={styles.bodyColumnStatus}>
        <div>
          {geschaeft.status}
        </div>
        <div>
          {fristMitarbeiter}
        </div>
        <div
          className={getStatusFristInStyle(geschaeft.fristMitarbeiterWarnung)}
        >
          {geschaeft.fristMitarbeiterWarnung}
        </div>
      </div>
      <div className={styles.bodyColumnKontaktIntern}>
        <div>
          {geschaeft.verantwortlichName}
        </div>
        <div>
          {geschaeft.verantwortlich}
        </div>
      </div>
    </div>
  )
}

GeschaefteItem.displayName = 'GeschaefteItem'

GeschaefteItem.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  keyPassed: PropTypes.string.isRequired,
}

export default enhance(GeschaefteItem)
