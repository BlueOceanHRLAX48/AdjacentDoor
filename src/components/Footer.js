import React from 'react';
import { MdGroups, MdHome, MdMenu, MdOutlineAddCircle, MdSearch } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function Footer() {
  const [search, setSearch] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);

  const openLeftBar = () => {
    document.getElementById('left-bar').style.display = 'block';
  };
  const closeLeftBar = () => {
    document.getElementById('left-bar').style.display = 'none';
  };

  const toggleSearchBar = () => {
    if (search) {
      document.getElementById('search-bar').style.display = 'flex';
    } else {
      document.getElementById('search-bar').style.display = 'none';
    }
    setSearch(!search);
  };

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (document.getElementById('left-bar') && width > 630) {
    document.getElementById('left-bar').style.display = 'flex';
  }

  return (
    <div className='fixed bottom-0 z-10 flex items-center justify-between w-screen px-4 py-2 bg-white border sm:hidden'>
      <NavLink to='/'>
        <MdHome className='' size='30' onClick={closeLeftBar} />
      </NavLink>
      <MdSearch className='' size='30' onClick={toggleSearchBar} />
      <NavLink to='/create-post'>
        <MdOutlineAddCircle className='cursor-pointer' size='30' onClick={closeLeftBar} />
      </NavLink>
      <NavLink to={`/groups`}>
        <MdGroups className='' size='30' onClick={closeLeftBar} />
      </NavLink>
      <MdMenu className='cursor-pointer' size='30' onClick={openLeftBar} />
    </div>
  );
}

export default Footer;
