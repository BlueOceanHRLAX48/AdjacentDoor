import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const JoinButton = (props) => {
  const [btnState, setButton] = useState('join')

  return <Button size="small" color="primary">
    {props.joinStatus}
  </Button>
}

export default JoinButton;