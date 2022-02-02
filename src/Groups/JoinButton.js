import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const JoinButton = (props) => {
  const [buttonType, setType] = useState('');
  const [open, setOpen] = useState(false);
  const handleClick = (userStatus) => {

  };

  useEffect(() => {
    setType(props.joinStatus)
  })


  //let database know user joined this group
  //get back joined group object {id:<num>, name:<name>, joinStatus:<joined>}

  const statusButton = (currentType, privacy) => {
    let user_group = props.user_group;
    let groupIndex = user_group.findIndex(element => element.id === props.group.Id);
    //send update to server based on button type
    switch(currentType) {
      case 'joined':
        return (
        )
      case 'pending':
        return (
        <div>
          <Button size="small" color="primary" onClick={handleClickOpen}>Pending</Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Do you wish to leave this group?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Clicking 'Yes' will rescind your request to join this group.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={() => {
                user_group.splice(groupIndex, 1)
                props.setUser(prevState => ({
                  ...prevState,
                  user_group: user_group
                }))
              }}>Yes</Button>
            </DialogActions>
          </Dialog>
        </div>)
      case 'admin':
        return (
        <div>
          <Button size="small" color="primary" onClick={() => {
            alert('You are this admin for this group');
          }}>Admin</Button>
        </div>)
      default:
        return (
        <div>
          <Button size="small" color="primary" onClick={() => {
            let response = fakeAxiosPost()
            user_group.push(response)
            props.setUser(prevState => ({
              ...prevState,
              user_group: user_group
            }))
          }}>Join</Button>
        </div>)
    }
  }

  return (<div>
    <Button size="small" color="primary" onClick={() => {
      user_group.splice(groupIndex, 1)
      props.setUser(prevState => ({
        ...prevState,
        user_group: user_group
      }))
    }
      }>Joined</Button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you wish to leave this group?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Clicking 'Yes' will remove you from the group.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={() => {
          user_group.splice(groupIndex, 1)
          props.setUser(prevState => ({
            ...prevState,
            user_group: user_group
          }))
        }}>Yes</Button>
      </DialogActions>
    </Dialog>
  </div>)
}

export default JoinButton;