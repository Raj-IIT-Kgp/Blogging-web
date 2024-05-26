import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';
import Starting from "./pages/Starting.tsx";
import {BlogsByAuthor} from "./pages/BlogsByAuthor.tsx";
import {Update} from "./pages/Update.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Starting/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/publish" element={<Publish />} />
                <Route path="/blog/author/:authorId" element={<BlogsByAuthor />} />
                <Route path="/blog/update/:id" element={<Update/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
