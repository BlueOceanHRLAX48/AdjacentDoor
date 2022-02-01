import { MdGroups, MdHealthAndSafety, MdHome } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function LeftBar() {
  const groupInfo = [
    ['Dog Club', '123', <MdGroups size='20' />],
    ['Cat Club', '456', <MdGroups size='20' />],
  ];

  const handleActive = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : '',
  });
  return (
    <div className='sm:h-screen w-screen flex-col sm:w-[250px] px-6 py-4'>
      <NavLink to='/'>
        <div className='px-4 pb-4 text-2xl font-bold text-primary '>Adjacent Door</div>
      </NavLink>
      <div className='overflow-y-scroll hide-scroll-bar'>
        <NavLink to='/admin' style={handleActive}>
          <LeftBarButton icon={<MdHome size='20' />} text='Admin' />
        </NavLink>
        {[
          ['Home', '/', <MdHome size='20' />],
          ['Safety', '/safety', <MdHealthAndSafety size='20' />],
          ['ratings', '/ratings', <MdGroups size='20' />],
          ['Others', '/others', <MdGroups size='20' />],
          ['ratings', '/ratings', <MdGroups size='20' />],
          ['Groups', '/groups', <MdGroups size='20' />],
        ].map(([title, url, icon], i) => (
          <NavLink to={url} style={handleActive}>
            <LeftBarButton icon={icon} text={title} key={i} />
          </NavLink>
        ))}
        {groupInfo.map(([title, url, icon], i) => (
          <NavLink to={'/groups/' + url} style={handleActive}>
            <LeftBarButton icon={icon} text={title} key={i} />
          </NavLink>
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
    <div className='relative flex items-center justify-start font-medium'>{text}</div>
  </div>
);

export default LeftBar;
