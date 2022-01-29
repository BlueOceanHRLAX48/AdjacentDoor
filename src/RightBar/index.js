import { purple } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import useTheme from '../components/useTheme';

function RightBar() {
  const [nextTheme, setTheme] = useTheme();

  return (
    <div className='w-[250px] h-screen flex flex-col px-6 py-4 '>
      <button className='mt-1 pt-1 pb-3 text-sm' onClick={() => setTheme(nextTheme)}>
        darkmode
      </button>
    </div>
  );
}

export default RightBar;
