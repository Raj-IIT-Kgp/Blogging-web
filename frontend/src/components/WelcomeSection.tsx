import React from 'react';

const WelcomeSection: React.FC = () => {
    return (
        <section className="flex flex-col md:flex-row bg-yellow-500 w-full h-screen p-4 md:p-8">
            <div className="w-full md:w-2/3 flex flex-col justify-center items-center md:items-start p-4">
                <h1 className="text-4xl md:text-8xl font-normal font-noe-display text-center md:text-left">Stay Curious.</h1>
                <p className="text-lg md:text-xl text-gray-700 mt-4 text-center md:text-left">Discover stories, thinking, and expertise from writers on any topic.</p>
            </div>
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center md:items-end p-4">
                <blockquote className="italic text-lg md:text-xl text-gray-800 text-center md:text-right">"The only way to do great work is to love what you do." - Steve Jobs</blockquote>
            </div>
        </section>
    );
}

export default WelcomeSection;
