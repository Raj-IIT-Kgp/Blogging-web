import { Appbar } from "../components/Appbar"
import {BlogCardByAuthor} from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogByAuthor, Blog } from "../hooks"; // Import Blog type here
import { useParams } from "react-router-dom";

// Rest of your code...

export const BlogsByAuthor = () => {
    const { authorId } = useParams();
    const { loading, blogs } = useBlogByAuthor({ authorId: authorId || "" });

    if (loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.map((blog: Blog) => <BlogCardByAuthor key={blog.id}
                                                             id={blog.id}
                                                             authorName={blog.author.name || "Anonymous"}
                                                             title={blog.title}
                                                             content={blog.content}
                                                             publishedDate={blog.publishedDate}
                />)}
            </div>
        </div>
    </div>
}