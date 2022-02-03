import React from 'react';
import { Card, CardActions, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';
import JoinButton from './JoinButton';
import { Link } from 'react-router-dom';

const GroupCard = (props) => {

  return (<Card sx={{maxWidth: 400}}>
    <CardActionArea component={Link} to={`/g/${props.group.id}`}>
      <CardMedia
        component="img"
        height="140"
        image={props.group.photo}
      />
      <CardContent>
        <Typography >
          {props.group.name}
        </Typography>
        <Typography >
          {props.group.privacy ? 'Private' : 'Public'}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <JoinButton joinStatus={props.joinStatus} user={props.user} group={props.group} setUser={props.setUser} user_group={props.user_group} />
    </CardActions>
  </Card>)
}

export default GroupCard;