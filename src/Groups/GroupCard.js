import React from 'react';
import { Card, CardActions, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';
import JoinButton from './JoinButton';
import { Link } from 'react-router-dom';

const GroupCard = (props) => {

  return (<Card sx={{maxWidth: 400, border: 2, borderColor: '#F0F0F0', marginBottom: '0.2rem', '&:hover': {backgroundColor: '#FFEEDD', borderColor: '#B8B8FF'}}} variant='outlined'>
    <CardActionArea component={Link} to={`/g/${props.group.id}`} >
      <CardMedia sx={{maxHeight: 200}}
        component="img"
        height="140"
        image={props.group.photo}
      />
      <CardContent>
        <Typography sx={{fontSize: '1.3rem'}}>
          {props.group.name}
        </Typography>
        <Typography sx={{fontSize: '0.9rem'}}>
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