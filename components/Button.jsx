import React from 'react';

const Button = ({ handleZoom, symbol }) => {
    return (
        <button onClick={handleZoom} className='bg-white text-gray-900 rounded-md px-4 py-2 shadow-md text-xl opacity-90'>{symbol}</button>
    )
}

export default Button;