import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { DialogContent } from "@material-ui/core";

const Modal = (props) => {
  const { content, title, modalStatus, setModalStatus } = props;

  return (
    <Dialog open={modalStatus}>
      <MuiDialogTitle
        disableTypography
        style={{ padding: "10px 20px 5px 20px" }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton
          style={{ position: "absolute", right: 0, top: 0 }}
          aria-label="close"
          onClick={() => setModalStatus(false)}
        >
          <CloseIcon color="secondary" />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent>{modalStatus && content}</DialogContent>
    </Dialog>
  );
};

export default Modal;
