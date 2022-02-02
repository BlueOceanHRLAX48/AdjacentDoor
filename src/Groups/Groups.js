import React, { useState, useEffect } from 'react';
import MakeGroup from './MakeGroup';
import GroupCard from './GroupCard';
import TopNav from '../TopNav';
import LeftBar from '../LeftBar';
import RightBar from '../RightBar';
import axios from 'axios';
import GroupsNearby from './sampledata';

function Groups(props) {
  const [groups, setGroups] = useState([]);
  const { user_group } = props.user;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/groups/lists`, {
        params: {
          longitude: props.currentLocation.longitude,
          latitude: props.currentLocation.latitude,
          r: 5000,
        },
      })
      .then((result) => {
        console.log(result.data);
        setGroups(result.data);
      })
      .catch((err) => console.log(err));
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
            <MakeGroup
              currentLocation={props.currentLocation}
              user={props.user}
            />
            <div>Groups near you</div>
            <div id='seeGroups'>
              {groups.map((card, index) => {
                let joinStatus = '';
                let groupIndex = user_group.findIndex(
                  (element) => element.id === card.id
                );
                if (groupIndex !== -1) {
                  if (user_group[groupIndex].accepted) {
                    if (card.admin_id === props.user.network_id) {
                      joinStatus = 'admin';
                    } else {
                      joinStatus = 'joined';
                    }
                  } else {
                    joinStatus = 'pending';
                  }
                } else {
                  if (card.privacy) {
                    joinStatus = 'privateNotJoined';
                  } else {
                    joinStatus = 'notJoined';
                  }
                }
                return (
                  <GroupCard
                    key={index}
                    group={card}
                    joinStatus={joinStatus}
                    setUser={props.setUser}
                    user_group={user_group}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <RightBar user={props.user} />
        </div>
      </div>
    </div>
  );
}

export default Groups;
