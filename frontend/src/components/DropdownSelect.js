import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const helpOptions = [
  {
    key: 'Therapy',
    text: 'Therapy',
    value: 'Therapy',
  },
  {
    key: 'Substances',
    text: 'Substances',
    value: 'Substances',
  },
  {
    key: 'Intimacy',
    text: 'Intimacy',
    value: 'Intimacy',
  },
  {
    key: 'Money',
    text: 'Money',
    value: 'Money'
  }
]

const DropdownSelect = (props) => (
  <Dropdown
    placeholder='What kind of help would you like?'
    fluid
    selection
    options={helpOptions}
    onChange={props.onChange}
  />
)

export default DropdownSelect