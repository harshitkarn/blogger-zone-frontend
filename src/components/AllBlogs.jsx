import { useState, useEffect } from "react";
import BlogItem from "./BlogItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteModal from "./DeleteModal";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idToDelete, SetIdToDelete] = useState(-1);
  const [isSearchedByAuthor, setIsSearchedByAuthor] = useState(false);
  const [authorName, setAuthorName] = useState("");
  useEffect(() => {
    if (!isSearchedByAuthor) {
      fetch("http://localhost:8085/getBlogs")
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setBlogs(result);
          setIsLoading(false);
        });
    } else {
      fetch("http://localhost:8085/getBlogByAuthorName/" + authorName)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setBlogs(result);
          setIsLoading(false);
        });
    }
  });

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
    });
  }

  function handleChange(event) {
    setAuthorName(event.target.value);
    if (event.target.value === "") setIsSearchedByAuthor(false);
    else setIsSearchedByAuthor(true);
  }

  function stopSearching() {
    setAuthorName("");
    setIsSearchedByAuthor(false);
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      {modalIsOpen && (
        <DeleteModal deleteClicked={deleteHandler} cancelClicked={closeModal} />
      )}
      <TextField
        required
        label="Search By Author"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={authorName}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      {!isSearchedByAuthor && (
        <Typography variant="h5" gutterBottom mt={2} mb={2}>
          All Blogs
        </Typography>
      )}
      {isSearchedByAuthor && (
        <Stack
          direction="row"
          mt={2}
          mb={2}
          sx={{ background: "#EFA18A", borderRadius: 2 }}
          p={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1" gutterBottom color="error">
            Searching for author {authorName}
          </Typography>
          <CloseIcon color="error" onClick={stopSearching} cursor="pointer" />
        </Stack>
      )}
      <Grid container spacing={4}>
        {blogs.map((blogo) => (
          <Grid key={blogo.id} item lg={3} md={4} sm={6} xs={12}>
            <BlogItem blog={blogo} deleteClicked={openModal} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AllBlogs;
