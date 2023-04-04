import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
function ReadBlog() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idToDelete, SetIdToDelete] = useState(-1);
  useEffect(() => {
    fetch("http://localhost:8085/getBlog/" + id)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setBlog(result);
        setIsLoading(false);
      });
  });

  function handleEdit() {
    localStorage.setItem("blogEditItem", JSON.stringify(blog));
    navigate("/addform");
  }

  function openModal(id) {
    SetIdToDelete(id);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  function deleteHandler() {
    setModalIsOpen(false);
    fetch("http://localhost:8085/deleteBlog/" + idToDelete, {
      method: "DELETE",
    }).then(() => {
      alert("Blog deleted");
      navigate("/");
    });
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box sx={{ width: "100%", maxWidth: 900, margin: "auto" }}>
      {modalIsOpen && (
        <DeleteModal deleteClicked={deleteHandler} cancelClicked={closeModal} />
      )}
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          {blog.title}
        </Typography>
        <Stack direction="row">
          <IconButton aria-label="edit" color="primary" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={(event) => openModal(blog.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Typography variant="caption" display="block" gutterBottom>
        {blog.authorName} - {blog.dateAndTime}
      </Typography>
      <Typography
        variant="caption"
        fontStyle="italic"
        display="block"
        gutterBottom
        color="#607d8b"
      >
        {blog.description}
      </Typography>
      <Typography variant="body1" gutterBottom align="justify">
        {blog.content}
      </Typography>
    </Box>
  );
}

export default ReadBlog;
