import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const JoinButton = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const fakeAxiosPost =() => {
    //let database know user joined this group
    //get back joined group object {id:<num>, name:<name>, joinStatus:<joined>}
    return {id: 1234567, name: 'fakeAxiosGroup', joinStatus: 'joined'}
  }

  const statusButton = (currentType, privacy) => {
    let userGroupIds = props.userGroupIds;
    let groupIndex = userGroupIds.findIndex(element => element.id === props.group.Id);
    //send update to server based on button type
    switch(currentType) {
      case 'joined':
        return (
        <div>
          <Button size="small" color="primary" onClick={handleClickOpen}>Joined</Button>
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
                userGroupIds.splice(groupIndex, 1)
                props.setUser(prevState => ({
                  ...prevState,
                  userGroupIds: userGroupIds
                }))
              }}>Yes</Button>
            </DialogActions>
          </Dialog>
        </div>)
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
                userGroupIds.splice(groupIndex, 1)
                props.setUser(prevState => ({
                  ...prevState,
                  userGroupIds: userGroupIds
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
            userGroupIds.push(response)
            props.setUser(prevState => ({
              ...prevState,
              userGroupIds: userGroupIds
            }))
          }}>Join</Button>
        </div>)
    }

  }

  return statusButton(props.joinStatus)
}

export default JoinButton;