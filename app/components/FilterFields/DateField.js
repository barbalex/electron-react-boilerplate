import React, { Component, PropTypes } from 'react'
import { FormGroup, InputGroup, FormControl, ControlLabel, Glyphicon } from 'react-bootstrap'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { observer } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import styles from './dateField.css'
import ComparatorSelector from './ComparatorSelector'
import SortSelector from './SortSelector'
import getDateValidationStateDate from '../../src/getDateValidationStateDate'

moment.locale('de')

const enhance = compose(observer)

class DateField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tabIndex: PropTypes.number.isRequired,
    values: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    changeComparator: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const { values, name } = this.props
    let value = values[name]
    if (value) value = moment(value, 'YYYY-MM-DD').format('DD.MM.YYYY')
    this.state = { value }
  }

  componentDidUpdate(prevProps) {
    const { values, name } = this.props
    let value = values[name]
    const prevValue = prevProps.values[name]
    if (value !== prevValue) {
      if (value) value = moment(value, 'YYYY-MM-DD').format('DD.MM.YYYY')
      this.setState({ value }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  onBlur = () => {
    const { values, name, change } = this.props
    let { value } = this.state
    // only filter if value has changed
    if (value !== values[name]) {
      if (!value || moment(value, 'DD.MM.YYYY').isValid()) {
        if (value) {
          // convert value for local state
          value = moment(value, 'DD.MM.YYYY').format('DD.MM.YYYY')
          this.setState({ value })
        }
        const e = {
          target: {
            type: 'text',
            name,
            value,
          },
        }
        change(e)
      } else {
        // TODO: tell user this is invalid
        console.log('DateField.js: invalid date') // eslint-disable-line no-console
      }
    }
  }

  onChangeDatePicker = (e, picker) => {
    const { name } = this.props
    const rValForBlur = {
      target: {
        type: 'text',
        name,
        value: picker.startDate,
      },
    }
    const rValForChange = {
      target: {
        type: 'text',
        name,
        value: moment(picker.startDate, 'DD.MM.YYYY').format('DD.MM.YYYY'),
      },
    }
    this.onChange(rValForChange)
    this.onBlur(rValForBlur)
  }

  render() {
    const { name, label, tabIndex, changeComparator } = this.props
    const { value } = this.state
    /**
     * need to give addon no padding
     * and the originally addon's padding to the glyphicon
     * to make entire addon clickable
     * for opening calendar
     */
    const datePickerAddonStyle = {
      padding: 0,
    }
    const datePickerCalendarStyle = {
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 12,
      paddingRight: 12,
    }

    return (
      <FormGroup
        className={name === 'rechtsmittelEntscheidDatum' ? styles.fieldEntscheidDatum : styles.field}
        validationState={getDateValidationStateDate(value)}
      >
        <ControlLabel>{label}</ControlLabel>
        <InputGroup>
          <SortSelector name={name} />
          <ComparatorSelector name={name} changeComparator={changeComparator} />
          <FormControl
            type="text"
            value={value || ''}
            name={name}
            onChange={this.onChange}
            onBlur={this.onBlur}
            bsSize="small"
            tabIndex={tabIndex}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker singleDatePicker drops="up" opens="left" onApply={this.onChangeDatePicker} className={styles.datePicker}>
              <Glyphicon glyph="calendar" style={datePickerCalendarStyle} />
            </DateRangePicker>
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    )
  }
}

export default enhance(DateField)
