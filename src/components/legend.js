import React from 'react';
import { FaCircle } from "react-icons/fa";
import { Stack } from '@mui/material';

function legend() {
    return (
      <div className='bg-ghostWhite z-10 rounded p-3 h-30 border-2 border-grey text-xs'>
        <Stack direction='column' spacing={1} >
        <span className='flex justify-start font-size'>
          <FaCircle color='#9381FF'/><div className='pl-2'>General</div>
        </span>
        <span className='flex justify-start opacity-100'>
          <FaCircle color='#FFD8BE'/><div className='pl-2'>Safety</div>
        </span>
        <span className='flex justify-start'>
          <FaCircle color='#B8B8FF'/><div className='pl-2'>For Sale</div>
        </span>
        </Stack>
      </div>
    )
}
  
  export default legend;