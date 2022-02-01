import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';
import JoinButton from './JoinButton';

const GroupCard = (props) => {

  return (<Card sx={{maxWidth: 400}}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={props.group.Photo}
      />
      <CardContent>
        <Typography >
          {props.group.Name}
        </Typography>
        <Typography >
          Members: {props.group.Users.length}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <JoinButton joinStatus={props.joinStatus} privacy={props.group.Privacy} group={props.group} setUser={props.setUser} userGroupIds={props.userGroupIds} />
    </CardActions>
  </Card>)
}

export default GroupCard;