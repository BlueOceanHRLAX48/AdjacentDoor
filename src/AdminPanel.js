import React from 'react';

function AdminPanel(props) {
  const [flaggedGroups, setFlaggedGroups] = React.useState([
    {
      id: 34,
      name: 'Flagged Demo Group',
      creator: 'Demo Guy',
      members: 174,
      reports: 99,
    },
    {
      id: 24,
      name: 'Flagged Demo 2',
      creator: 'John Smith',
      members: 12,
      reports: 7,
    },
    {
      id: 567,
      name: 'Flagged Demo 3',
      creator: 'Blue Ocean',
      members: 1,
      reports: 17,
    },
    {
      id: 2,
      name: 'Flagged Demo 4',
      creator: 'Test Person',
      members: 1823,
      reports: 123,
    },
  ]);

  const groupElements = flaggedGroups.map((group) => <Group group={group} />);

  return (
    <div className='h-screen'>
      <div className='text-4xl font-bold text-center py-2'>
        AdjacentDoor Admin Panel
      </div>
      <div className='w-1/2 border rounded p-4'>
        <div className='text-center'>Groups Pending Review</div>
        <div className='p-2'>{groupElements}</div>
      </div>
    </div>
  );
}

export default AdminPanel;

function Group(props) {
  const [expand, setExpand] = React.useState(false);

  return (
    <>
      <div
        className='w-full flex items-center border-b p-2 rounded hover:bg-ghostWhite transition-all duration-150'
        onClick={() => setExpand((x) => !x)}
      >
        {props.group.name}
        <div className='ml-auto text-sm'>created by {props.group.creator}</div>
      </div>
      {expand && (
        <div className='px-2 pb-2'>Members: {props.group.members}</div>
      )}
    </>
  );
}
