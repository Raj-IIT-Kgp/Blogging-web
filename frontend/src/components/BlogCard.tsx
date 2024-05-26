import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BACKEND_URL} from "../config.ts";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}
export const BlogCard = ({
                             id,
                             authorName,
                             title,
                             content,
                             publishedDate
                         }: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar name={authorName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

export const BlogCardByAuthor = ({
                                     id,
                                     authorName,
                                     title,
                                     content,
                                     publishedDate
                                 }: BlogCardProps) => {


    const navigate = useNavigate();

    const deleteBlog = async () => {
        if (window.confirm("Do you want to delete the blog?")) {
            try {
                const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                alert(response.data.message)
                navigate('/blogs'); // navigate to home page or the page that lists all blogs
            } catch (error) {
                console.error("There was an error deleting the blog post:", error);
            }
        }
    };
    return (
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <Link to={`/blog/${id}`}>
                <div className="flex">
                    <Avatar name={authorName} />
                    <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                    <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                        <Circle />
                    </div>
                    <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </Link>
            <div className={"justify-end"}>
                <Link to={`/blog/update/${id}`}>
                    <button>
                        Edit
                    </button>
                </Link>
                <button className={"pl-3"} onClick={deleteBlog}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">
    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
    </div>
}

