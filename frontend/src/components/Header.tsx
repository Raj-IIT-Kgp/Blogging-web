import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="w-full bg-yellow-500 py-4 px-8 flex justify-between items-center border border-solid border-black">
            <div className="text-2xl font-bold text-black">Medium</div>
            <div>
                <Link to="/signin" className="text-black px-4 py-2 hover:underline">Sign In</Link>
                <Link to="/signup" className="bg-black text-white px-4 py-2 ml-4 rounded-full hover:bg-gray-800">Get Started</Link>
            </div>
        </header>
    );
}

export default Header;
