import React from 'react';

/**
 * Component called on page Home
 * @param {String} icon  
 * @param {String} title  
 * @param {String} text  
 * @returns {JSX} - React component
 */
const Details = ({ icon, title, text }) => {
    return (
        <div className='one-details'>
            <img className='icon-details' src={icon} alt={title} />
            <h3 className='title-details'>{title}</h3>
            <p className='text-details'>{text}</p>
        </div>
    );
};

export default Details;