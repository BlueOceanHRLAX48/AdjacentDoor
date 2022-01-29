import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import { MdGroups, MdHome, MdHealthAndSafety } from 'react-icons/md';

function LeftBar() {
  return (
    <div className='flex flex-col w-[250px] h-screen px-6 py-4'>
      <Link to='/'>
        <div className='text-2xl  text-primary font-bold pb-4 px-4 '>Adjacent Door</div>
      </Link>
      {[
        ['Home', '/', <MdHome size='20' />],
        ['Safety', '/safety', <MdHealthAndSafety size='20' />],
        ['Groups', '/groups', <MdGroups size='20' />],
        ['ratings', '/ratings', <MdGroups size='20' />],
        ['Others', '/others', <MdGroups size='20' />],
      ].map(([title, url, icon], i) => (
        <Link to={url}>
          <LeftBarButton icon={icon} text={title} key={i} />
        </Link>
      ))}
      <Link to='/my-profile'>
        <UserInfo />
      </Link>
    </div>
  );
}

const LeftBarButton = ({ icon, text = 'text' }) => (
  <div
    className={`flex py-4 px-4 hover:bg-ghostWhite hover:rounded-full cursor-pointer dark:hover:bg-gray-600`}
  >
    <div className='relative flex items-center justify-start mr-4'>{icon}</div>
    <div className={`relative flex items-center justify-start text-base font-medium`}>{text}</div>
  </div>
);

export default LeftBar;
