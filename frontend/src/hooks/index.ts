import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "publishedDate" : string,
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);

            })
    }, [id])

    return {
        loading,
        blog

    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);

            })
    }, [])

    return {
        loading,
        blogs

    }
}

export const useBlogByAuthor = ({ authorId }: { authorId: string }) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);// Change setBlog to setBlogs and default value to []

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/author/${authorId}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs); // Change setBlog to setBlogs
                setLoading(false);

            })
    }, [authorId])

    return {
        loading,
        blogs,
    }
}

// Add this to hooks/index.ts
export const useAuthorId = () => {
    const [authorId, setAuthorId] = useState(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/authorId`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setAuthorId(response.data.authorId);
            })
    }, [])

    return authorId;
}

export const useAuthorName = () => {
    const [authorName, setAuthorName] = useState("");

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/name`, {
            headers: {
                'Authorization': localStorage.getItem("token"),

            }
        })
            .then(response => {
                setAuthorName(response.data.name);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return authorName;
}


