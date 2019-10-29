import React from 'react'
import { Pane, SelectField } from 'evergreen-ui'

const FieldSelect = ({ options, error, label, description, validationMessage, handleSelect }) => {
    return (
        options.length > 0 &&
        <Pane>
            <SelectField
                isInvalid={!!error}
                label={label}
                description={description}
                validationMessage={error}
                onChange={handleSelect}
            >
                {
                    options.map(opt => <option key={opt.id} value={opt.value}>{opt.name}</option>)
                }
            </SelectField>
        </Pane>
    )
}

export default FieldSelect
