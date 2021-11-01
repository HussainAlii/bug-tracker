import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function AlertDialog({action=null, open, handleClose, message, title}) {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{backgroundColor:"#334",color:"lightgray"}} id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent style={{backgroundColor:"#334"}}>
            <DialogContentText style={{color:"darkgray"}} id="alert-dialog-description">
              <div dangerouslySetInnerHTML={{__html: message}}></div>
  
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{backgroundColor:"#334"}}>
            <Button onClick={action?action:handleClose} style={{color:"red"}}>
              Ok
            </Button>
            <Button onClick={handleClose} style={{color:"white"}} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }