
import Header from "../components/Header.js";
import WelcomeSection from "../components/WelcomeSection.js";

const Starting = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Header/>
            <WelcomeSection/>
        </div>
    );
};

export default Starting;