import React from 'react'

const SelectLanguage = (prop) => {
  return (
    <>
    <option value={prop.dataObj.code}>{prop.dataObj.name}</option>
    </>
  )
}

export default SelectLanguage
