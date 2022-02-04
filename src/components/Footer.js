import React from 'react';
import { MdHome, MdMenu, MdOutlineAddCircle } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function Footer() {
  const [create, setCreate] = React.useState(true);
  const [width, setWidth] = React.useState(window.innerWidth);

  const openLeftBar = () => {
    document.getElementById('left-bar').style.display = 'block';
  };
  const closeLeftBar = () => {
    document.getElementById('left-bar').style.display = 'none';
  };

  const toggleCreatePost = () => {
    if (create) {
      document.getElementById('create-post').style.display = 'flex';
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      document.getElementById('create-post').style.display = 'none';
    }
    setCreate(!create);
  };

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (document.getElementById('left-bar') && width > 640) {
    document.getElementById('left-bar').style.display = 'flex';
  }

  return (
    <div className='fixed bottom-0 z-10 flex items-center justify-between w-screen px-4 py-2 bg-white border sm:hidden'>
      <NavLink to='/'>
        <MdHome className='' size='30' onClick={closeLeftBar} />
      </NavLink>

      <MdOutlineAddCircle
        className='cursor-pointer'
        size='30'
        onClick={toggleCreatePost}
      />

      <MdMenu className='cursor-pointer' size='30' onClick={openLeftBar} />
    </div>
  );
}

export default Footer;
