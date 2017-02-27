export default (state, field, direction) => {
  const sortFieldsWithoutPassedField = state.sortFields.filter(sf =>
    sf.field !== field
  )
  if (!direction) {
    // remove field
    return sortFieldsWithoutPassedField
  }
  return [
    {
      field: field,
      direction: direction,
    },
    ...sortFieldsWithoutPassedField,
  ]
}
