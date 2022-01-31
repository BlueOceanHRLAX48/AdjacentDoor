import React from 'react';
import { Link } from 'react-router-dom';
import LeftBar from './LeftBar';
import RightBar from './RightBar';

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

  React.useEffect(() => {
    getGroups();
  }, []);

  function getGroups() {
    // axios call to get flagged groups
    // res => setFlaggedGroups(res)
  }

  const groupElements = flaggedGroups
    .sort((a, b) => b.reports - a.reports)
    .map((group, i) => <Group group={group} key={i} refresh={getGroups} />);

  return (
    <div className='flex h-screen'>
      <LeftBar />
      <div className='flex flex-col grow'>
        <div className='text-4xl font-bold text-center pt-3 pb-2'>
          Admin Panel
        </div>

        <div className='w-full border rounded p-4'>
          <div className='text-center'>Groups Pending Review</div>
          <div className='p-2'>{groupElements}</div>
        </div>
      </div>
      <RightBar />
    </div>
  );
}

export default AdminPanel;

function Group(props) {
  const [expand, setExpand] = React.useState(false);

  function handleForgive() {
    console.log(props.group);
  }

  function handleDelete() {
    console.log(props.group);
  }

  return (
    <>
      <div
        className='w-full flex items-center border-b p-2 rounded hover:bg-ghostWhite transition-all duration-150'
        onClick={() => setExpand((x) => !x)}
      >
        <div className='font-bold'>{props.group.name}</div>
        <div className='ml-auto text-sm'>{props.group.reports} reports</div>
      </div>
      {expand && (
        <div className='p-2 flex'>
          <Link
            to={`/g/${props.group.id}`}
            className='w-fit px-2 ring-1 ring-primary rounded hover:bg-ghostWhite'
          >
            Visit Group Page
          </Link>
          <div className='pl-2'>{props.group.members} members</div>
          <button
            className='ml-auto border border-red-400 px-2 rounded hover:bg-red-300'
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className='ml-2 px-2 border border-green-300 rounded hover:bg-green-200'
            onClick={handleForgive}
          >
            Forgive
          </button>
        </div>
      )}
    </>
  );
}
