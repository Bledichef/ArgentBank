import React from 'react';
import Banner from "../assets/bank-tree.jpeg"
import IconChat from '../assets/icon-chat.png'
import IconMoney from '../assets/icon-money.png'
import IconSecurity from '../assets/icon-security.png'
import Details from '../components/Details';

/**
 * Call the component Details
 * @returns {JSX} - React Page
 */
const Home = () => {
    return (
        <div className='Home'>
            <div className='container-image-text'>
                <img src={Banner} alt="bank-tree" />
                <div className='container-text'>
                    <h2 className='text-h2'>No fees.</h2>
                    <h2 className='text-h2'>No minimum deposit.</h2>
                    <h2 className='text-h2'>High interest rates.</h2>
                    <p>Open a savings account with Argent Bank today!</p>
                </div>
            </div>
            <div className='container-details'>
                <Details icon={IconChat} title="You are our #1 priority" text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes." />
                <Details icon={IconMoney} title="More savings means higher rates" text="The more you save with us, the higher your interest rate will be!" />
                <Details icon={IconSecurity} title="Security you can trust" text="We use top of the line encryption to make sure your data and money is always safe." />
            </div>
        </div>
    );
};

export default Home;