import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import styles from './Geschaefte.css'

const getStatusFristInStyle = (fristMitarbeiterWarnung) => {
  if (fristMitarbeiterWarnung === 'FÄLLIG') return styles.fieldWarnungFaellig
  if (fristMitarbeiterWarnung === 'HEUTE') return styles.fieldWarnungHeute
  return null
}

const enhance = compose(
  inject('store'),
  withHandlers({
    onClick: props => () => {
      const { store, index } = props
      const { geschaeftePlusFilteredAndSorted: geschaefte } = store.geschaefte
      const { geschaeftToggleActivated } = store
      const path = store.history.location.pathname
      const geschaeft = geschaefte[index]
      // if path is not '/geschaefte', make it that
      // because this is also called from '/fieldFilter'
      if (path === '/filterFields') {
        store.history.push('/geschaefte')
      }
      geschaeftToggleActivated(geschaeft.idGeschaeft)
    },
  }),
  observer
)

const GeschaefteItem = ({
  store,
  index,
  onClick,
}) => {
  const {
    activeId,
    geschaeftePlusFilteredAndSorted: geschaefte,
  } = store.geschaefte
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
      className={trClassName}
      onClick={onClick}
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
  onClick: PropTypes.func.isRequired,
}

export default enhance(GeschaefteItem)
