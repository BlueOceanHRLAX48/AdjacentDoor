import { MdGroups, MdHealthAndSafety, MdHome } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function LeftBar({ setFilter, filter, userGroup }) {
  const handleActive = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : '',
  });

  return (
    <div className='h-screen sm:h-screen w-screen flex-col sm:w-[250px] px-6 py-4'>
      <NavLink to='/' key={uuidv4()}>
        <div className='px-4 pb-4 text-2xl font-bold text-primary '>Adjacent Door</div>
      </NavLink>
      <div className='overflow-y-scroll hide-scroll-bar'>
        <NavLink to='/' style={handleActive} key={uuidv4()} className='hidden sm:block'>
          <LeftBarButton icon={<MdHome size='20' />} text='Home' />
        </NavLink>
        <div className='mt-4 mb-2 ml-4 text-sm'>Neighborhood</div>
        {[
          ['Safety', '/safety', <MdHealthAndSafety size='20' />],
          ['Ratings', '/ratings', <MdGroups size='20' />],
          ['Others', '/others', <MdGroups size='20' />],
        ].map(([title, url, icon]) => (
          <NavLink to={url} style={handleActive} key={uuidv4()}>
            <LeftBarButton icon={icon} text={title} />
          </NavLink>
        ))}
        <div className='mt-4 mb-2 ml-4 text-sm'>All Groups</div>
        {userGroup.map(({ id, name }) => (
          <NavLink to={`/g/${id}`} style={handleActive} key={uuidv4()}>
            <LeftBarButton text={name} />
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
