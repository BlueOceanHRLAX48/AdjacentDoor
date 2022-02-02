import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import axios from 'axios';

function MoreMenu({ postId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReport = () => {
    axios.put(`${process.env.REACT_APP_SERVER}/posts/report/${postId}`);
    setAnchorEl(null);
  };

  return (
    <div>
      <MdMoreHoriz
        className='absolute cursor-pointer top-4 right-6'
        size='20'
        onClick={handleClick}
        id='basic-more'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      />
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-more',
        }}
      >
        <MenuItem onClick={handleClose}>Privacy</MenuItem>
        <MenuItem onClick={handleReport}>Report</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default MoreMenu;
