import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

import styles from './Geschaefte.css'

const FristMitarbeiterWarnungDiv = styled(
  ({ fristInStyle, children, ...rest }) => // eslint-disable-line no-unused-vars
    <div {...rest}>
      {children}
    </div>
)`
  font-weight: ${(props) => (props.fristInStyle ? 900 : 'inherit')};
  letter-spacing: ${(props) => (props.fristInStyle ? '0.35em' : 'inherit')};
  font-size: ${(props) => (props.fristInStyle ? '16px' : 'inherit')};
  -webkit-text-stroke-color: ${(props) => (props.fristInStyle ? 'black' : 'inherit')};
  -webkit-text-stroke-width: ${(props) => (props.fristInStyle ? '1.3px' : 'inherit')};
  -webkit-text-fill-color: ${(props) => {
    if (props.fristInStyle === 'red') return 'red'
    if (props.fristInStyle === 'yellow') return 'yellow'
    return 'inherit'
  }};
`
const getStatusFristInStyle = (fristMitarbeiterWarnung) => {
  if (fristMitarbeiterWarnung === 'FÄLLIG') return 'red'
  if (fristMitarbeiterWarnung === 'HEUTE') return 'yellow'
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
        <FristMitarbeiterWarnungDiv
          fristInStyle={getStatusFristInStyle(geschaeft.fristMitarbeiterWarnung)}
        >
          {geschaeft.fristMitarbeiterWarnung}
        </FristMitarbeiterWarnungDiv>
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
