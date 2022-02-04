import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import axios from 'axios';

function MoreMenu({ postId, getPosts, user, post, group }) {
  const [reported, setReported] = useState(() =>
    JSON.parse(localStorage.getItem(`adReported${user.network_id}${postId}`))
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReport = () => {
    if (!reported) {
      setReported(true);
      axios
        .put(`${process.env.REACT_APP_SERVER}/posts/report/${postId}`)
        .then(() => {
          localStorage.setItem(`adReported${user.network_id}${postId}`, 'true');
          alert('Thank you for your report');
          return;
        })
        .catch((err) => {
          setReported(false);
          console.error(err);
        });
      setAnchorEl(null);
    }
  };

  const handleForgive = () => {
    axios
      .put(`${process.env.REACT_APP_SERVER}/posts/${postId}/reset`)
      .then((res) => {
        getPosts();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER}/posts/delete/${postId}`)
      .then((res) => {
        getPosts();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {(!reported ||
        user.admin ||
        post.user_info.username === user.username ||
        group.admin_id === user.network_id) && (
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
            {!reported && <MenuItem onClick={handleReport}>Report</MenuItem>}
            {(user.admin ||
              post.user_info.username === user.username ||
              group?.admin_id === user.network_id) && (
              <MenuItem onClick={handleForgive}>Forgive</MenuItem>
            )}
            {(user.admin ||
              post.user_info.username === user.username ||
              group?.admin_id === user.network_id) && (
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            )}
          </Menu>
        </div>
      )}
    </>
  );
}

export default MoreMenu;
