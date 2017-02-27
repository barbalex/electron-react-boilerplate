import pageStandardState from './pageStandardState'

export default {
  pages: [Object.assign(pageStandardState)],
  activePageIndex: 0,
  remainingGeschaefte: [],
  title: '',
  queryTitle: true,
  reportType: 'fristen',
  building: false,
  showPagesModal: false,
  modalTextLine1: '',
  modalTextLine2: '',
}
