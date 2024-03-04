import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

function ModalComponent({ clickHandler, open, setOpen,message }) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] shadow-md p-4 bg-white rounded-md">
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
          <Stack direction="row" justifyContent="flex-end" gap={3} mt={4}>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                clickHandler();
                setOpen(false);
              }}
            >
              بله
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
ModalComponent.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  open:PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message:PropTypes.string.isRequired
};
export { ModalComponent };
