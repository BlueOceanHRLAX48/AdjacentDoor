import { Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import SearchBar from './components/SearchBar';
import useTheme from './components/useTheme';

function TopNav({
  posts,
  setPosts,
  filteredPosts,
  setFilteredPosts,
  filter,
  setFilter,
  user,
  search,
  setSearch,
  setUser,
}) {
  const [nextTheme, setTheme] = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setUser({});
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='flex items-center justify-between w-full mt-4 mb-4 '>
      <div>
        <SearchBar
          posts={posts}
          setPosts={setPosts}
          filteredPosts={filteredPosts}
          setFilteredPosts={setFilteredPosts}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <div className='flex justify-end'>
        {/* <button className='text-sm' onClick={() => setTheme(nextTheme)}>
          darkmode
        </button> */}

        <div className='ml-4 mr-4 cursor-pointer'>
          <Avatar
            alt='Avatar'
            src={
              user.profile_img ||
              'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'
            }
            sx={{ width: 35, height: 35 }}
            id='user-profile'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
        </div>

        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClick={handleClose}
          MenuListProps={{
            'aria-labelledby': 'user-profile',
          }}
          className='text-sm'
        >
          {user.admin && (
            <NavLink to='/admin' key={uuidv4()}>
              <MenuItem onClick={handleClose}>Admin</MenuItem>
            </NavLink>
          )}

          <NavLink to='/my-profile' key={uuidv4()}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </NavLink>

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default TopNav;
