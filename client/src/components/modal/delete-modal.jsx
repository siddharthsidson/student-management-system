import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { DialogContent, DialogActions, Button } from "@material-ui/core";

const DeleteModal = (props) => {
  const { message, modalStatus, setModalStatus, onSuccess, onCancel } = props;
  
  return (
    <Dialog open={modalStatus}>
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">Delete Student Record</Typography>
        <IconButton
          style={{ position: "absolute", right: 0, top: 0 }}
          aria-label="close"
          onClick={() => setModalStatus(false)}
        >
          <CloseIcon color="secondary" />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent style={{ fontWeight: 600, fontSize: 20 }}>
        {message}
        <DialogActions style={{ marginTop: "1vh" }}>
          <Button
            color="primary"
            variant="outlined"
            autoFocus
            onClick={onSuccess}
          >
            YES
          </Button>
          <Button
            color="primary"
            variant="outlined"
            autoFocus
            onClick={onCancel}
          >
            NO
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
