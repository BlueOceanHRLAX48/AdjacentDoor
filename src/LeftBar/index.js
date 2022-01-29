import React from 'react';
import MenuButton from './MenuButton';

function LeftBar() {
  const [categories, setCategories] = React.useState([
    'Home',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
  ]);

  const categoryElements = categories.map((button, i) => (
    <MenuButton name={button} key={i} />
  ));

  return (
    <div className='border-r border-primary bg-ghostWhite w-[250px] h-screen'>
      {categoryElements}
    </div>
  );
}

export default LeftBar;
