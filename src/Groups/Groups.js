import React, { useState, useEffect } from 'react';
import MakeGroup from './MakeGroup';
import GroupCard from './GroupCard';
import TopNav from '../TopNav';
import LeftBar from '../LeftBar';
import RightBar from '../RightBar';

function Groups(props) {
  const [groups, setGroups] = useState([]);
  const { userGroupIds } = props.user;

  const fakeAxiosGetGroups = () => {
    //maybe this data is passed down already from the App page
    return {
      groups: [
        {
          Id: 1,
          Admin_id: {
            1: 'Jojo',
          },
          Name: 'Rockin Group 1',
          Users: [{ 2345: 'jessie' }, { 5462: 'johnny' }, { 46756: 'jane' }, { 253: 'jenny' }],
          City: 'Santa Ana',
          State: 'California',
          Zip: 92705,
          Coordinates: {
            longitude: -117.79459,
            latitude: 33.74128,
          },
          Photo:
            'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxM[…]8MHxzZWFyY2h8MXx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80',
          Friendliness: 3,
          Safety: 5,
          Privacy: false,
          Pending: [{ 7534: 'jackie' }],
        },
        {
          Id: 2,
          Admin_id: {
            48567: 'Joy',
          },
          Name: 'Bluesy Number 2',
          Users: [{ 4765: 'jay' }, { 1: 'jaja' }, { 347: 'jones' }],
          City: 'Santa Ana',
          State: 'California',
          Zip: 92705,
          Coordinates: {
            longitude: -117.79431,
            latitude: 33.74027,
          },
          Photo: '',
          Friendliness: 4,
          Safety: 4,
          Privacy: false,
          Pending: [],
        },
        {
          Id: 3,
          Admin_id: {
            96478: 'Jenie',
          },
          Name: 'Workin numero 3',
          Users: [{ 26452: 'jack' }, { 253: 'jenny' }],
          City: 'Santa Ana',
          State: 'California',
          Zip: 92705,
          Coordinates: {
            longitude: -117.79791,
            latitude: 33.741,
          },
          Photo: '',
          Friendliness: 2,
          Safety: 2,
          Privacy: true,
          Pending: [{ 26435: 'Jojo' }],
        },
      ],
    };
  };

  useEffect(() => {
    let returnedResult = fakeAxiosGetGroups();
    setGroups(returnedResult.groups);
  }, [props.currentLocation.longitude, props.currentLocation.latitude]);

  return (
    <div className='flex w-screen dark:bg-gray-900 dark:text-white'>
      <div className='hidden sm:flex'>
        <LeftBar user={props.user} />
      </div>
      <div>
        <div>
          <TopNav user={props.user} />
        </div>
        <div className='flex-col'>
          <div>
            <MakeGroup />
          </div>
          <div id='seeGroups'>
            {groups.map((card, index) => {
              let joinStatus = 'notJoined';
              let groupIndex = userGroupIds.findIndex((element) => element.id === card.Id);
              if (groupIndex !== -1) {
                joinStatus = userGroupIds[groupIndex].joinStatus;
              }
              return (
                <GroupCard
                  key={index}
                  group={card}
                  joinStatus={joinStatus}
                  setUser={props.setUser}
                  userGroupIds={userGroupIds}
                />
              );
            })}
          </div>
          <div>
            <RightBar user={props.user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;
