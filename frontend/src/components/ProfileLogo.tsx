import { Link } from 'react-router-dom';
import {useAuthorId, useAuthorName} from '../hooks';


export const ProfileLogo = () => {
    const authorId = useAuthorId();
    const authorName = useAuthorName();
    const firstLetter = authorName ? authorName[0].toUpperCase() : 'A';
    return (
        <Link to={`/blog/author/${authorId}`} className="relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full w-10 h-10 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <span className="text-md font-extralight text-white">
                {firstLetter}
            </span>
        </Link>
    );
};