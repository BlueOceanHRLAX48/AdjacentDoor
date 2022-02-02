import { MdGroups, MdHealthAndSafety, MdHome, MdMenu, MdOutlineAddCircle } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function Footer({ groupId }) {
  const openLeftBar = () => {
    document.getElementById('left-bar').style.display = 'flex';
  };
  const closeLeftBar = () => {
    document.getElementById('left-bar').style.display = 'none';
  };

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
      <NavLink to={`/g/${groupId}`}>
        <MdGroups className='' size='30' onClick={closeLeftBar} />
      </NavLink>
      <MdMenu className='cursor-pointer' size='30' onClick={openLeftBar} />
    </div>
  );
}

export default Footer;
