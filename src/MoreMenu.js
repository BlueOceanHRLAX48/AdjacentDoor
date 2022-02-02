import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

function MoreMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
        <MenuItem onClick={handleClose}>Report</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default MoreMenu;
