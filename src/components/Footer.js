import React from 'react';
import {
  MdGroups,
  MdHealthAndSafety,
  MdHome,
  MdMenu,
  MdOutlineAddCircle,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function Footer() {
  const [width, setWidth] = React.useState(window.innerWidth);

  const openLeftBar = () => {
    document.getElementById('left-bar').style.display = 'flex';
  };
  const closeLeftBar = () => {
    document.getElementById('left-bar').style.display = 'none';
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
      <NavLink to='/safety'>
        <MdHealthAndSafety className='' size='30' onClick={closeLeftBar} />
      </NavLink>
      <NavLink to='/create-post'>
        <MdOutlineAddCircle className='' size='30' onClick={closeLeftBar} />
      </NavLink>
      <NavLink to={`/groups`}>
        <MdGroups className='' size='30' onClick={closeLeftBar} />
      </NavLink>
      <MdMenu className='cursor-pointer' size='30' onClick={openLeftBar} />
    </div>
  );
}

export default Footer;
