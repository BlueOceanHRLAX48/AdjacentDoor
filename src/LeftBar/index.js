import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import { MdGroups, MdHome, MdHealthAndSafety } from 'react-icons/md';

function LeftBar() {
  return (
    <div className='flex flex-col w-[250px] h-screen px-6 py-4'>
      <Link to='/'>
        <div className='text-2xl  text-primary font-bold pb-4 px-4 '>Adjacent Door</div>
      </Link>
      <Link to='/'>
        <LeftBarButton icon={<MdHome size='20' />} text={'Home'} />
      </Link>
      <Link to='/safety'>
        <LeftBarButton icon={<MdHealthAndSafety size='20' />} text={'Safety'} />
      </Link>
      <Link to='/groups'>
        <LeftBarButton icon={<MdGroups size='20' />} text={'Groups'} />
      </Link>
      <Link to='/rating'>
        <LeftBarButton icon={<MdGroups size='20' />} text={'Rating'} />
      </Link>
      <Link to='/any'>
        <LeftBarButton icon={<MdGroups size='20' />} text={'FIFTH'} />
      </Link>
      <Link to='/my-profile'>
        <UserInfo />
      </Link>
    </div>
  );
}

const LeftBarButton = ({ icon, text = 'text' }) => (
  <div className={`flex py-4 px-4 hover:bg-ghostWhite hover:rounded-full cursor-pointer`}>
    <div className='leftbar-icon'>{icon}</div>
    <div className={`leftbar-menu`}>{text}</div>
  </div>
);

export default LeftBar;
