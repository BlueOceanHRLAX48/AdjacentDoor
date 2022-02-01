import { MdGroups, MdHealthAndSafety, MdHome, MdMenu, MdOutlineAddCircle } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function Footer({ showMenu }) {
  return (
    <div className='fixed bottom-0 z-10 flex items-center justify-between w-screen px-4 py-2 bg-white border sm:hidden'>
      <NavLink to='/'>
        <MdHome className='' size='30' />
      </NavLink>
      <NavLink to='/safety'>
        <MdHealthAndSafety className='' size='30' />
      </NavLink>
      <NavLink to='/addPost'>
        <MdOutlineAddCircle className='' size='30' />
      </NavLink>
      <NavLink to='/groups'>
        <MdGroups className='' size='30' />
      </NavLink>
      <MdMenu className='' size='30' onClick={showMenu} />
    </div>
  );
}

export default Footer;
