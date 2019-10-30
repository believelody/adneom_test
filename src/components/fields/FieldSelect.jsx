import React from 'react'
import { Pane, SelectField } from 'evergreen-ui'

const FieldSelect = ({ options, label, description, handleSelect, value }) => {
    return (
        options.length > 0 &&
        <Pane>
            <SelectField
                label={label}
                description={description}
                onChange={handleSelect}
                value={value}
            >
                {
                    options.map(opt => <option key={opt.id} value={opt.value}>{opt.name}</option>)
                }
            </SelectField>
        </Pane>
    )
}

export default FieldSelect
