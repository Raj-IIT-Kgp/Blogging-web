import React from 'react';

const WelcomeSection: React.FC = () => {
    return (
        <section className="flex flex-col md:flex-row bg-yellow-500 w-full h-screen p-8">
            <div className="w-full md:w-2/3 flex flex-col justify-center" style={{ paddingTop: '0vh', marginTop: '-100px' }}>
                <h1 className="text-8xl font-normal font-noe-display ">Stay Curious.</h1>
                <p className="text-xl text-gray-700 mt-4">Discover stories, thinking, and expertise from writers on any topic.</p>
            </div>
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center md:items-end" style={{ paddingTop: '0vh', marginTop: '-60px' }}>
                <blockquote className="italic text-xl text-gray-800">"The only way to do great work is to love what you do." - Steve Jobs</blockquote>
            </div>
        </section>
    );
}

export default WelcomeSection;;