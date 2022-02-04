import axios from 'axios';
import React from 'react';

function PendingUser(props) {
  const [displayName, setDisplayName] = React.useState('');

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/user/${props.user}`)
      .then((res) => {
        setDisplayName(res.data.username);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.user]);

  function handleAccept(networkId, response) {
    axios
      .put(
        `${process.env.REACT_APP_SERVER}/groups/user/${props.groupId}/accept?network_id=${networkId}&accepted=${response}`
      )
      .then((res) => props.getData())
      .catch((err) => console.error(err));
  }

  function handleReject(networkId) {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER}/groups/user/${props.groupId}/left?network_id=${networkId}`
      )
      .then(() => {
        props.getUserData();
        props.getData();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className='w-full border rounded px-2 py-1 flex'>
      {displayName}
      <div className='ml-auto'>
        <button
          className='rounded border border-primary hover:bg-secondary px-2 transition-all duration-150'
          onClick={() => handleAccept(props.user, true)}
        >
          Accept
        </button>
        <button
          className='ml-2 rounded border border-red-400 hover:bg-red-300 px-2 transition-all duration-150'
          onClick={() => handleReject(props.user)}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default PendingUser;
