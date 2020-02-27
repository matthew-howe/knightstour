import React from 'react';

const Square = props => {
    return (
        <div className={props.styling} key={props.serial}> </div>
    )
}

export default Square;