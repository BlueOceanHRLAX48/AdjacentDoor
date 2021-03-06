import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';

const JoinButton = (props) => {
  const [buttonType, setType] = useState('');
  const [open, setOpen] = useState(false);
  const [user_group, setUserGroup] = useState(props.user_group);

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    setType(props.joinStatus)
  })

  const handleJoin = () => {
    let userGroupCopy = user_group;
    let accepted = props.group.privacy ? false : true;
    axios.post(`${process.env.REACT_APP_SERVER}/groups/user/${props.group.id}/join?network_id=${props.user.network_id}&accepted=${accepted}`)
    .then(() => {
      let response = {id: props.group.id, name: props.group.name, accepted: accepted}
      userGroupCopy.push(response);
      props.setUser(prevState => ({
        ...prevState,
        user_group: userGroupCopy
      }))
      setUserGroup(userGroupCopy);
    })
    .catch(err => console.log(err))
  }

  const handleLeave = () => {
    let userGroupCopy = user_group;
    let groupIndex = user_group.findIndex(element => element.id === props.group.id);
    axios.delete(`${process.env.REACT_APP_SERVER}/groups/user/${props.group.id}/left?network_id=${props.user.network_id}`)
    .then(() => {
      userGroupCopy.splice(groupIndex, 1);
      props.setUser(prevState => ({
        ...prevState,
        user_group: userGroupCopy
      }))
      setUserGroup(userGroupCopy);
    })
    .catch(err => console.log(err))
  }

  const onHover = {
    '&:hover': {
      color: 'ghostWhite'
    }
  }

  const statusButton = (privacy) => {
    switch(buttonType) {
      case 'joined':
        return (
        <div>
          <Button size="small" color='secondary' sx={onHover} onClick={() => {
            handleClickOpen()
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
                Clicking 'Yes' will remove you from the group. Private groups will require approval before you can rejoin.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={handleClose}>No</Button>
              <Button color='secondary' onClick={() => {
                handleClose();
                handleLeave();
              }}>Yes</Button>
            </DialogActions>
          </Dialog>
        </div>)
      case 'pending':
        return (
        <div>
          <Button size="small" color="secondary" sx={onHover} onClick={handleClickOpen}>Pending</Button>
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
                handleClose();
                handleLeave()
              }}>Yes</Button>
            </DialogActions>
          </Dialog>
        </div>)
      case 'admin':
        return (
        <div>
          <Button size="small" color="primary" onClick={() => {
            alert('You are the admin for this group');
          }}>Admin</Button>
        </div>)
      case 'privateNotJoined':
        return(
          <div>
            <Button size="small" color="primary" sx={onHover} onClick={() => {
              handleJoin();
            }}>Request to Join</Button>
          </div>
        )
      default:
        return (
        <div>
          <Button size="small" color="primary" sx={onHover} onClick={() => {
            handleJoin();
          }}>Join</Button>
        </div>)
    }
  }

  return statusButton(props.joinStatus)
}

export default JoinButton;