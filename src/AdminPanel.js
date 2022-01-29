import React from 'react';

function AdminPanel(props) {
  const [flaggedGroups, setFlaggedGroups] = React.useState([
    { id: 34, name: 'Flagged Demo Group', members: 174, reports: 17 },
  ]);

  return (
    <div className='h-screen bg-ghostWhite'>
      <div className='text-4xl font-bold text-center py-2'>
        AdjacentDoor Admin Panel
      </div>
    </div>
  );
}

export default AdminPanel;
