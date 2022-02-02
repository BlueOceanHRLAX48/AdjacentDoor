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
          {/* Members: {props.group.users.length} */}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <JoinButton joinStatus={props.joinStatus} privacy={props.group.privacy} group={props.group} setUser={props.setUser} user_group={props.user_group} />
    </CardActions>
  </Card>)
}

export default GroupCard;