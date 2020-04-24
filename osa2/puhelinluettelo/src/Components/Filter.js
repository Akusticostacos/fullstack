import React from 'react';

const Filter = (props) => {
    const value = props.filter
    const onChange = props.onChange
    return (
        <div>
            filter shown with: <input
            value={value}
            onChange={onChange} />
        </div>
    )
}

export default Filter