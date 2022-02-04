import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import MakeGroup from './MakeGroup';
import GroupCard from './GroupCard';
import TopNav from '../TopNav';
import LeftBar from '../LeftBar';
import RightBar from '../RightBar';
import axios from 'axios';

function Groups(props) {
  const [groups, setGroups] = useState([]);
  const { user_group } = props.user;
  const [radius, setRadius] = useState(50);
  const [search, setSearch] = useState('');
  const [findRadius, setFindR] = useState(50);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/groups/lists`, {
        params: {
          longitude: props.currentLocation.longitude,
          latitude: props.currentLocation.latitude,
          mi: radius,
        },
      })
      .then((result) => {
        setGroups(result.data);
      })
      .catch((err) => console.log(err));
  }, [props.currentLocation, radius, props.user]);

  return (
    <div className='h-screen overflow-hidden sm:flex dark:bg-gray-900 dark:text-white'>
      <div>
        <LeftBar user={props.user} />
      </div>
      <div>
        <div>
          <TopNav
            setSearch={setSearch}
            search={search}
            user={props.user}
            setUser={props.setUser}
          />
        </div>
        <div className='sm:flex'>
          <div className='h-screen overflow-y-scroll hide-scroll-bar'>
            <div>
              <div
                id='groupsTop'
                className='w-full sm:w-[600px] px-4 mb-32 sm:mb-20'
              >
                <MakeGroup
                  currentLocation={props.currentLocation}
                  user={props.user}
                  getUserData={props.getUserData}
                />

                <div>
                  <TextField
                    sx={{
                      width: '50%',
                      marginTop: '1%',
                      borderColor: '#B8B8FF',
                      color: '#B8B8FF',
                      '&:hover': {
                        color: '#9381FF',
                        borderColor: '#9381FF',
                        backgroundColor: 'ghostWhite',
                      },
                    }}
                    id='radiusInput'
                    variant='outlined'
                    placeholder='search radius in miles'
                    type='number'
                    min='0'
                    max='500'
                    value={findRadius}
                    onChange={(e) => {setFindR(e.target.value)}}
                  ></TextField>
                  <Button
                    sx={{
                      width: '49%',
                      marginTop: '1%',
                      marginLeft: '1%',
                      height: '56px',
                      borderColor: '#B8B8FF',
                      color: '#B8B8FF',
                      '&:hover': {
                        color: '#9381FF',
                        borderColor: '#9381FF',
                        backgroundColor: 'ghostWhite',
                      },
                    }}
                    variant='outlined'
                    onClick={() => {
                      setRadius(findRadius);
                    }}
                  >
                    FIND
                  </Button>
                </div>
              </div>
              <div
                id='seeGroups'
                className='w-full sm:w-[600px] px-4 mb-32 sm:mb-20'
              >
                <div style={{ color: '#B8B8FF' }}>GROUPS NEAR YOU</div>
                {groups
                  ?.filter((group) =>
                    group?.name?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((card, index) => {
                    let joinStatus = '';
                    let groupIndex = user_group.findIndex(
                      (element) => element.id === card.id
                    );
                    if (groupIndex !== -1) {
                      if (user_group[groupIndex].accepted) {
                        if (
                          parseInt(card.admin_id) ===
                          parseInt(props.user.network_id)
                        ) {
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
                        user={props.user}
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
    </div>
  );
}

export default Groups;
