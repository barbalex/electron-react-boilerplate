import React, { PropTypes } from 'react'
import { hashHistory } from 'react-router'
import moment from 'moment'
import styles from './Geschaefte.css'

const getDauerBisFristMitarbeiter = (geschaeft) => {
  if (!geschaeft || !geschaeft.fristMitarbeiter) return null
  const now = moment()
  const end = moment(geschaeft.fristMitarbeiter, 'DD.MM.YYYY')
  const duration = moment.duration(end.diff(now))
  const days = duration.asDays()
  return days ? Math.ceil(days) : ''
}

const getStatusFristInText = (dauerBisFristMitarbeiter) => {
  if (dauerBisFristMitarbeiter < 0) return 'FÄLLIG'
  if (dauerBisFristMitarbeiter === 0) return 'HEUTE'
  if (dauerBisFristMitarbeiter === 1) return `In ${dauerBisFristMitarbeiter} Tag`
  return `In ${dauerBisFristMitarbeiter} Tagen`
}

const getStatusFristInStyle = (statusFristInText) => {
  if (statusFristInText === 'FÄLLIG') return styles.fieldFristInFaellig
  if (statusFristInText === 'HEUTE') return styles.fieldFristInHeute
  return null
}

const GeschaefteItem = ({
  geschaefte,
  geschaefteGefilterteIds,
  activeId,
  path,
  geschaeftToggleActivated,
  index,
  keyPassed,
}) => {
  const isActive = (
    activeId &&
    activeId === geschaefteGefilterteIds[index]
  )
  const trClassName = (
    isActive ?
    [styles.tableBodyRow, styles.active].join(' ') :
    styles.tableBodyRow
  )
  const geschaeft = geschaefte.find(g =>
    g.idGeschaeft === geschaefteGefilterteIds[index]
  )
  // make sure geschaeft exists
  if (!geschaeft) return null
  const fristMitarbeiter = (
    geschaeft.fristMitarbeiter ?
    `Frist: ${geschaeft.fristMitarbeiter}` :
    ''
  )
  const dauerBisFristMitarbeiter = getDauerBisFristMitarbeiter(geschaeft)
  const statusFristInText = getStatusFristInText(dauerBisFristMitarbeiter)
  const statusFristIn = geschaeft.fristMitarbeiter ? statusFristInText : null

  return (
    <div
      key={keyPassed}
      className={trClassName}
      onClick={() => {
        // if path is not '/geschaefte', make it that
        // because this is also called from '/fieldFilter'
        // no idea why but using 'router' passed by 'withRouter' did not work here
        if (path !== '/geschaefte') {
          hashHistory.push('/geschaefte')
        }
        geschaeftToggleActivated(geschaeft.idGeschaeft)
      }}
    >
      <div className={styles.columnIdGeschaeft}>
        <div>
          {geschaeft.idGeschaeft}
        </div>
      </div>
      <div className={styles.columnGegenstand}>
        <div className={styles.fieldGegenstand}>
          {geschaeft.gegenstand}
        </div>
        {/*
          <div>
            {geschaeft.details}
          </div>
        */}
      </div>
      <div className={styles.columnStatus}>
        <div>
          {geschaeft.status}
        </div>
        <div>
          {fristMitarbeiter}
        </div>
        <div
          className={getStatusFristInStyle(statusFristInText)}
        >
          {statusFristIn}
        </div>
      </div>
      <div className={styles.columnKontaktIntern}>
        <div>
          {geschaeft.verantwortlichVornameName}
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
  geschaefte: PropTypes.array.isRequired,
  geschaefteGefilterteIds: PropTypes.array.isRequired,
  geschaeftToggleActivated: PropTypes.func.isRequired,
  activeId: PropTypes.number,
  path: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  keyPassed: PropTypes.number.isRequired,
}

export default GeschaefteItem
