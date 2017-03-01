import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import styles from './Page.css'
import FaelligeGeschaefteHeader from './faelligeGeschaefte/Header'
import FaelligeGeschaefteRows from './faelligeGeschaefte/Rows'
import VernehmlassungenHeader from './vernehmlassungen/Header'
import VernehmlassungenRows from './vernehmlassungen/Rows'
import List1Header from './list1/Header'
import List1Rows from './list1/Rows'
import filterCriteriaToArrayOfStrings from '../../src/filterCriteriaToArrayOfStrings'
import sortCriteriaToArrayOfStrings from '../../src/sortCriteriaToArrayOfStrings'
import logoImg from '../../etc/logo.png'
import PageTitle from './PageTitle'

const enhance = compose(
  inject('store'),
  observer
)

class Page extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    pageIndex: PropTypes.number.isRequired,
  }

  componentDidMount = () => {
    this.showPagesModal()
    // wait with next stepp until message is shown
    setTimeout(() => {
      this.nextStepp()
    }, 100)
  }

  componentDidUpdate = () => {
    const { reportType } = this.props.store.pages
    if (['typFaelligeGeschaefte', 'angekVernehml', 'laufendeVernehml'].includes(reportType)) {
      // need to wait for next tick
      // otherwise in vernehmlassungen
      // some rows were only listed on second call
      const that = this
      setTimeout(() => that.nextStepp())
    } else {
      this.nextStepp()
    }
  }

  showPagesModal = () => {
    const { store } = this.props
    const { pagesModalShow } = store
    const { pages, remainingGeschaefte } = store.pages
    const { geschaefteGefilterteIds } = store.geschaefte
    const msgLine2Txt = `Bisher ${pages.length} Seiten, ${remainingGeschaefte.length} Geschäfte noch zu verarbeiten`
    const msgLine2 = geschaefteGefilterteIds.length > 50 ? msgLine2Txt : ''
    pagesModalShow(true, 'Der Bericht wird aufgebaut...', msgLine2)
  }

  nextStepp = () => {
    /**
     * - measure height of pageSize-component
     * - if > desired page height:
     *  - move last row to next page
     *  - render
     * - else:
     *  - insert next row
     *  - render
     */
    const { store, pageIndex } = this.props
    const {
      pageAddGeschaeft,
      pagesMoveGeschaeftToNewPage,
      pagesFinishedBuilding,
      pagesModalShow,
    } = store
    const { pages, activePageIndex, remainingGeschaefte } = store.pages
    const { geschaeftePlusFilteredAndSorted: geschaefte } = store.geschaefte

    // don't do anything on not active pages
    if (pageIndex === activePageIndex) {
      const rowsContainerPageIndex = this[`rowsContainer${pageIndex}`]
      const offsetHeight = rowsContainerPageIndex ? rowsContainerPageIndex.offsetHeight : null
      const scrollHeight = rowsContainerPageIndex ? rowsContainerPageIndex.scrollHeight : null
      const activePageIsFull = pages[pageIndex].full

      if (!activePageIsFull && remainingGeschaefte.length > 0) {
        if (offsetHeight < scrollHeight) {
          const lastGeschaeft = geschaefte[geschaefte.length - 1]
          pagesMoveGeschaeftToNewPage(lastGeschaeft)
          this.showPagesModal()
        } else {
          pageAddGeschaeft()
        }
      }
      if (remainingGeschaefte.length === 0) {
        if (offsetHeight < scrollHeight) {
          const lastGeschaeft = geschaefte[geschaefte.length - 1]
          pagesMoveGeschaeftToNewPage(lastGeschaeft)
          this.showPagesModal()
        } else {
          pagesModalShow(false, '', '')
          pagesFinishedBuilding()
        }
      }
    }
  }

  tableRows = () => {
    const { geschaeftePlusFilteredAndSorted: geschaefte } = this.props.store.geschaefte
    const { reportType } = this.props.store.pages

    return geschaefte.map((geschaeft, index) => {
      if (reportType === 'typFaelligeGeschaefte') {
        return (
          <FaelligeGeschaefteRows
            geschaeft={geschaeft}
            key={geschaeft.idGeschaeft}
            rowIndex={index}
          />
        )
      }
      if (
        reportType === 'angekVernehml' ||
        reportType === 'laufendeVernehml'
      ) {
        return (
          <VernehmlassungenRows
            geschaeft={geschaeft}
            key={geschaeft.idGeschaeft}
            rowIndex={index}
          />
        )
      }
      if (reportType === 'list1') {
        return (
          <List1Rows
            geschaeft={geschaeft}
            key={geschaeft.idGeschaeft}
            rowIndex={index}
          />
        )
      }
      return null
    })
  }

  render = () => {
    const { store, pageIndex } = this.props
    const { pages, building, reportType } = store.pages
    const { filterFields, sortFields } = store.geschaefte
    const firstPage = pageIndex === 0
    const pageContainerStyle = (
      building ?
      [styles.pageContainer, styles.pageContainerOverflow].join(' ') :
      styles.pageContainer
    )

    return (
      <div className={pageContainerStyle}>
        <div
          className={styles.rowsContainer}
          ref={(c) => { this[`rowsContainer${pageIndex}`] = c }}
        >
          {
            firstPage &&
            <img
              src={logoImg}
              height="70"
              style={{
                marginBottom: 15
              }}
              alt="Logo"
            />
          }
          <PageTitle
            firstPage={firstPage}
          />
          {
            firstPage &&
            <div
              className={styles.filterCriteria}
            >
              Filterkriterien: {filterCriteriaToArrayOfStrings(filterFields).join(' & ')}
            </div>
          }
          {
            firstPage &&
            <div
              className={styles.sortCriteria}
            >
              Sortierkriterien: {sortCriteriaToArrayOfStrings(sortFields).join(' & ')}
            </div>
          }
          {
            reportType === 'typFaelligeGeschaefte' &&
            <FaelligeGeschaefteHeader />
          }
          {
            (
              reportType === 'angekVernehml' ||
              reportType === 'laufendeVernehml'
            ) &&
            <VernehmlassungenHeader />
          }
          {
            reportType === 'list1' &&
            <List1Header />
          }
          {this.tableRows()}
        </div>
        <div className={styles.footer}>
          <p>
            {moment().format('DD.MM.YYYY')}
          </p>
          <p>
            Seite {pageIndex + 1}/{pages.length}
          </p>
        </div>
      </div>
    )
  }
}

export default enhance(Page)
