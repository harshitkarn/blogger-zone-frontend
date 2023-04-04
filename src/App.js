import AddBlogForm from "./components/AddBlogForm";
import AllBlogs from "./components/AllBlogs";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import ReadBlog from "./components/ReadBlog";

function App() {
  return <NavBar>
    <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/addform" element={<AddBlogForm />} />
        <Route path="/blog/:id" element={<ReadBlog />} />
      </Routes>
  </NavBar>
}

export default App;
