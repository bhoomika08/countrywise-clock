import React from 'react';

const DropdownSingle = React.memo(({ value, options, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="selector wd-100">
      {Object.values(options).map(option => <option key={option.name} value={option.name}>{option.label}</option>)}
    </select>  
  )
})

export default DropdownSingle;