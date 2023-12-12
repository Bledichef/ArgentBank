import React from 'react';

/**
 * Component called on page User for each transaction
 * @param {String} accountTitle 
 * @param {String} accountAmount 
 * @param {String} accountDescription 
 * @returns {JSX} - React component
 */
const Account = ({ accountTitle, accountAmount, accountDescription }) => {


    return (
        <section className='Account'>
            <div className='account-content-wrapper'>
                <h3 className='account-title'>{accountTitle}</h3>
                <p className='account-amount'>{accountAmount}</p>
                <p className='account-description'>{accountDescription}</p>
            </div>
            <div className='account-content-wrapper-cta'>
                <button className='transaction-button'>View transactions</button>
            </div>
        </section>
    );
};

export default Account;