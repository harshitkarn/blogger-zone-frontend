import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function AddBlogForm() {
  let navigate = useNavigate();
  const editItem = localStorage.getItem("blogEditItem");
  var blogitem = {
    title: "",
    description: "",
    content: "",
    authorName: "",
    dateAndTime: "",
  };
  var isEditing = false;
  if (editItem !== null) {
    blogitem = JSON.parse(editItem);
    isEditing = true;
    localStorage.removeItem("blogEditItem");
  }
  const [blog, setBlog] = useState(blogitem);
  const handleChange = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value });
    // console.log(blog);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const d = new Date();
    if (!isEditing)
      blog["dateAndTime"] = d.toLocaleString("en-GB", { hour12: true });
    console.log(blog["content"].length);
    if (blog["content"].length > 65000) {
      alert("Content max size reached");
      return;
    }
    fetch("http://localhost:8085/createBlog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      alert(isEditing ? "Blog Updated" : "New Blog Created");
      setBlog({
        title: "",
        description: "",
        content: "",
        authorName: "",
        dateAndTime: "",
      });
      navigate("/");
    });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography variant="h5" gutterBottom>
        Create/Update a blog
      </Typography>
      <TextField
        fullWidth
        required
        id="blogTitle"
        label="Blog Title"
        name="title"
        value={blog.title}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        required
        id="blogAuthor"
        label="Author Name"
        name="authorName"
        value={blog.authorName}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        required
        id="blogDesc"
        label="Description"
        name="description"
        multiline
        rows={2}
        value={blog.description}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        required
        id="blogContent"
        label="Write your blog here..."
        name="content"
        multiline
        rows={20}
        value={blog.content}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained">
        Upload
      </Button>
    </Stack>
  );
}

export default AddBlogForm;
