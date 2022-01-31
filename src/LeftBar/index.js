import { MdGroups, MdHealthAndSafety, MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';

function LeftBar() {
  return (
    <div className='flex h-screen flex-col sm:w-[250px] px-6 py-4'>
      <Link to='/'>
        <div className='px-4 pb-4 text-2xl font-bold text-primary '>Adjacent Door</div>
      </Link>
      {/* //boolean for admin
      //group for filter value of the string includes blah blah blah */}
      <div className='overflow-y-scroll hide-scroll-bar'>
        {[
          ['Home', '/', <MdHome size='20' />],
          ['Safety', '/safety', <MdHealthAndSafety size='20' />],
          ['Groups', '/groups', <MdGroups size='20' />],
          ['ratings', '/ratings', <MdGroups size='20' />],
          ['Others', '/others', <MdGroups size='20' />],
          ['ratings', '/ratings', <MdGroups size='20' />],
          ['Others', '/others', <MdGroups size='20' />],
          ['ratings', '/ratings', <MdGroups size='20' />],
          ['Others', '/others', <MdGroups size='20' />],
          ['ratings', '/ratings', <MdGroups size='20' />],
          ['Others', '/others', <MdGroups size='20' />],
          ['ratings', '/ratings', <MdGroups size='20' />],
          ['Others', '/others', <MdGroups size='20' />],
        ].map(([title, url, icon], i) => (
          <Link to={url}>
            <LeftBarButton icon={icon} text={title} key={i} />
          </Link>
        ))}
      </div>
    </div>
  );
}

const LeftBarButton = ({ icon, text = 'text' }) => (
  <div
    className={`flex py-4 px-4 hover:bg-ghostWhite hover:rounded-full cursor-pointer transition-all duration-150 dark:hover:bg-gray-600`}
  >
    <div className='relative flex items-center justify-start mr-4'>{icon}</div>
    <div className='relative flex items-center justify-start text-base font-medium'>{text}</div>
  </div>
);

export default LeftBar;
