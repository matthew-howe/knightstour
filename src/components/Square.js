import React from 'react';

const Square = props => {
    let onclick = props.placeKnight === undefined ? () => '' : props.placeKnight
    return (
        <div
            onClick={() => onclick(Number(props.serial))} 
            className={props.styling} 
            key={props.serial}> </div>
    )
}

export default Square;