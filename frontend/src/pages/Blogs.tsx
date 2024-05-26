import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import {Blog, useBlogs} from "../hooks";


export const Blogs = () => {
    const { loading, blogs } = useBlogs();


    if (loading) {
        return <div>
            <Appbar/>
            <div  className="flex justify-center">
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
        <Appbar/>
        <div className="flex justify-center">
            <div>
                {blogs.map((blog: Blog) => <BlogCard key={blog.id} // Add key prop here
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
