import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 3,
  zIndex: 1,
};

function DeleteModal(props) {
  return (
    <Box sx={style}>
      <Stack direction="row" spacing={2} alignItems="center">
        <WarningIcon fontSize="large" />
        <Stack>
          <Typography variant="body1" gutterBottom>
            Delete Blog
          </Typography>
          <Typography variant="body2" color="#607d8b" gutterBottom>
            Are you sure you want to delete this blog
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" m={1} spacing={2} justifyContent="end">
        <Button variant="outlined" onClick={props.cancelClicked}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={props.deleteClicked}>
          Delete
        </Button>
      </Stack>
    </Box>
  );
}

export default DeleteModal;
