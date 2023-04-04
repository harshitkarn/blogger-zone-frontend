import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate, Link } from "react-router-dom";

const cardStyle = {
  transition: "0.3s",
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  backgroundColor: "#E5E8E8",
};

export default function BlogItem(props) {
  let navigate = useNavigate();
  function handleEdit() {
    localStorage.setItem("blogEditItem", JSON.stringify(props.blog));
    navigate("/addform");
  }
  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.blog.dateAndTime}
        </Typography>
        <Typography variant="h5" component="div">
          {props.blog.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          by {props.blog.authorName}
        </Typography>
        <Typography variant="body2" align="justify">
          {props.blog.content.substring(0, 100)}...
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button startIcon={<EditIcon />} size="small" onClick={handleEdit}>
          Edit
        </Button>
        <Button
          startIcon={<VisibilityIcon />}
          component={Link}
          to={"/blog/" + props.blog.id}
          size="small"
        >
          Read
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          size="small"
          onClick={(event) => props.deleteClicked(props.blog.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
