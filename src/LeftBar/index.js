import { MdGroups, MdHealthAndSafety, MdHome } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import BackgroundLetterAvatars from '../components/StringAvatar';

function LeftBar({ setFilter, filter, user }) {
  const handleActive = ({ isActive }) => ({
    color: isActive ? '#9381FF' : '',
  });

  return (
    <div className='h-screen sm:h-screen w-screen flex-col sm:w-[250px] px-6 py-4'>
      <NavLink to='/' key={uuidv4()}>
        <div className='px-4 pb-4 text-2xl font-bold text-primary '>
          Adjacent Door
        </div>
      </NavLink>
      <div className='overflow-y-scroll hide-scroll-bar'>
        <NavLink
          to='/'
          style={handleActive}
          key={uuidv4()}
          className='hidden sm:block'
        >
          <LeftBarButton icon={<MdHome size='20' />} text='Home' />
        </NavLink>

        <div className='mt-4 mb-2 ml-4 text-sm'>Neighborhood</div>

        {[
          ['All', '', <MdHealthAndSafety size='20' />],
          ['General', 'general', <MdGroups size='20' />],
          ['Safety', 'safety', <MdHealthAndSafety size='20' />],
          ['For Sale', 'forsale', <MdGroups size='20' />],
<<<<<<< HEAD
        ].map(([title, value, icon], i) => (
          <button onClick={() => setFilter(value)} key={i}>
=======
        ].map(([title, value, icon]) => (
          <div onClick={() => setFilter(value)}>
>>>>>>> 1fa9ec7 (add icon to groups and active color)
            <LeftBarButton icon={icon} text={title} />
          </div>
        ))}

        <div className='mt-4 mb-2 ml-4 text-sm'>Discover Groups</div>

        <NavLink to={`/groups`} style={handleActive} key={uuidv4()}>
          <LeftBarButton text='All Groups' icon={<MdGroups size='20' />} />
        </NavLink>

        {user?.user_group?.map(({ id, name }) => (
          <NavLink to={`/g/${id}`} style={handleActive} key={uuidv4()}>
            <LeftBarButton text={name} icon={BackgroundLetterAvatars(name)} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

const LeftBarButton = ({ icon, text = 'text' }) => (
  <div className='flex px-4 py-4 transition-all duration-150 cursor-pointer hover:bg-ghostWhite hover:rounded-full dark:hover:bg-gray-600'>
    <div className='items-center justify-start mr-4'>{icon}</div>
    <div className='items-center justify-start font-medium'>{text}</div>
  </div>
);

export default LeftBar;
