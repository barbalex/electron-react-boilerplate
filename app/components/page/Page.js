import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import styles from './Page.css'
import FaelligeGeschaefteHeader from './faelligeGeschaefte/Header'
import FaelligeGeschaefteRows from './faelligeGeschaefte/Rows'
import VernehmlassungenHeader from './vernehmlassungen/Header'
import VernehmlassungenRows from './vernehmlassungen/Rows'
import List1Header from './list1/Header'
import List1Rows from './list1/Rows'
import filterCriteriaToArrayOfStrings from '../../src/filterCriteriaToArrayOfStrings'
import sortCriteriaToArrayOfStrings from '../../src/sortCriteriaToArrayOfStrings'
import logoImg from 'file!../../etc/logo.png'  // eslint-disable-line
import PageTitle from '../../containers/page/PageTitle'

class Page extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    geschaefte: PropTypes.array.isRequired,
    filterFields: PropTypes.array.isRequired,
    sortFields: PropTypes.array.isRequired,
    remainingGeschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    activePageIndex: PropTypes.number.isRequired,
    pageIndex: PropTypes.number.isRequired,
    pageAddGeschaeft: PropTypes.func.isRequired,
    pagesMoveGeschaeftToNewPage: PropTypes.func.isRequired,
    pagesFinishedBuilding: PropTypes.func.isRequired,
    pagesModalShow: PropTypes.func.isRequired,
    building: PropTypes.bool.isRequired,
    reportType: PropTypes.string.isRequired,
  }

  componentDidMount = () => {
    this.showPagesModal()
    // wait with next stepp until message is shown
    setTimeout(() => {
      this.nextStepp()
    }, 100)
  }

  componentDidUpdate = () => {
    this.nextStepp()
  }

  showPagesModal = () => {
    const {
      pagesModalShow,
      pages,
      geschaefteGefilterteIds,
      remainingGeschaefte,
    } = this.props
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
    const {
      pages,
      activePageIndex,
      pageIndex,
      geschaefte,
      remainingGeschaefte,
      pageAddGeschaeft,
      pagesMoveGeschaeftToNewPage,
      pagesFinishedBuilding,
      pagesModalShow,
    } = this.props

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
        pagesModalShow(false, '', '')
        pagesFinishedBuilding()
      }
    }
  }

  tableRows = () => {
    const {
      geschaefte,
      reportType,
    } = this.props

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
        reportType === 'typVernehmlassungen' ||
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
    const {
      filterFields,
      sortFields,
      pageIndex,
      pages,
      building,
      reportType,
    } = this.props
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
              reportType === 'typVernehmlassungen' ||
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

export default Page
