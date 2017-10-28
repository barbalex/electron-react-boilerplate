import React, { PropTypes } from 'react'
import {
  FormGroup,
  InputGroup,
  FormControl,
  ControlLabel,
  Glyphicon,
} from 'react-bootstrap'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'

import getDateValidationStateDate from '../../src/getDateValidationStateDate'

moment.locale('de')

const StyledFormGroup = styled(FormGroup)`grid-column: 1;`
const StyledDatePicker = styled(DateRangePicker)`cursor: pointer;`

const enhance = compose(inject('store'), observer)

const DateField = ({
  store,
  name,
  label,
  change,
  blur,
  onChangeDatePicker,
  tabIndex,
}) => {
  const {
    activeId,
    geschaeftePlusFilteredAndSorted: geschaefte,
  } = store.geschaefte
  const geschaeft = geschaefte.find(g => g.idGeschaeft === activeId) || {}
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
    <StyledFormGroup
      validationState={getDateValidationStateDate(geschaeft[name])}
    >
      <ControlLabel>{label}</ControlLabel>
      <InputGroup>
        <FormControl
          type="text"
          value={geschaeft[name] || ''}
          name={name}
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={tabIndex}
        />
        <InputGroup.Addon style={datePickerAddonStyle}>
          <StyledDatePicker
            singleDatePicker
            drops="up"
            opens="left"
            onApply={onChangeDatePicker.bind(this, name)}
          >
            <Glyphicon glyph="calendar" style={datePickerCalendarStyle} />
          </StyledDatePicker>
        </InputGroup.Addon>
      </InputGroup>
    </StyledFormGroup>
  )
}

DateField.displayName = 'DateField'

DateField.propTypes = {
  store: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  onChangeDatePicker: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
}

export default enhance(DateField)
