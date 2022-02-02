import { MdGroups, MdHealthAndSafety, MdHome } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function LeftBar({ setFilter }) {
  const groupInfo = [
    ['Dog Club', '123', <MdGroups size='20' />],
    ['Cat Club', '456', <MdGroups size='20' />],
  ];

  const handleActive = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : '',
  });
  return (
    <div className='sm:h-screen w-screen flex-col sm:w-[250px] px-6 py-4'>
      <NavLink to='/' key={uuidv4()}>
        <div className='px-4 pb-4 text-2xl font-bold text-primary '>Adjacent Door</div>
      </NavLink>
      <div className='overflow-y-scroll hide-scroll-bar'>
        <NavLink to='/admin' style={handleActive} key={uuidv4()}>
          <LeftBarButton icon={<MdHome size='20' />} text='Admin' key={uuidv4()} />
        </NavLink>
        <NavLink to='/home' style={handleActive} key={uuidv4()}>
          <LeftBarButton icon={<MdHome size='20' />} text='Home' key={uuidv4()} />
        </NavLink>

        <div className='ml-4 text-sm'>Neighborhood</div>

        {[
          ['Safety', '/safety', <MdHealthAndSafety size='20' />],
          ['ratings', '/ratings', <MdGroups size='20' />],
          ['Others', '/others', <MdGroups size='20' />],
          ['ratings', '/ratings', <MdGroups size='20' />],
          ['Groups', '/groups', <MdGroups size='20' />],
        ].map(([title, url, icon]) => (
          <NavLink to={url} style={handleActive} key={uuidv4()}>
            <LeftBarButton icon={icon} text={title} key={uuidv4()} />
          </NavLink>
        ))}
        <div className='ml-4 text-sm'>All Groups</div>
        {groupInfo.map(([title, url, icon, filter], i) => (
          <NavLink to={`/g/:group_id` + url} style={handleActive} key={uuidv4()}>
            <LeftBarButton
              icon={icon}
              text={title}
              key={uuidv4()}
              onClick={() => setFilter(title)}
            />
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
