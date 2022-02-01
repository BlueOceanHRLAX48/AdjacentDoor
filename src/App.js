import React, { useState } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import Home from './Home';
import Leaderboard from './Leaderboard';
import Login from './Login';
import MyProfile from './MyProfile';
import Groups from './Groups/Groups';
import SignUp from './SignUp';
import GroupDetail from './GroupDetail';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({
    user_id: 1,
    firstname: 'ernest',
    lastname: 'zhang',
    username: 'ez',
    network_id: '1124asfas',
    email: '12345@gmail.com',
    admin: false,
    address: '1234 street st',
    city: 'city',
    state: 'state',
    zip: '5678',
    privacy: false,
    profile_img: '1234.com',
    contribution: 0,
    default_group: {
      id: 1,
      name: 'the place',
    },
    user_group: [
      {
        id: 1,
        name: 'the group',
      },
      {
        id: 2,
        name: 'the second group',
      },
    ],
  });
  const [currentLocation, setCurrentLocation] = React.useState({});

  React.useEffect(() => {
    axios.get(`http://localhost:3001/user/${user.network_id}`).then((res) => {
      setUser(res.data);
      console.log(res.data);
    });

    navigator.geolocation.getCurrentPosition((res) =>
      setCurrentLocation({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
      })
    );
  }, []);

  setInterval(() => {
    navigator.geolocation.getCurrentPosition((res) =>
      setCurrentLocation({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
      })
    );
  }, 300000);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route
          path='/groups'
          element={
            <Groups
              user={user}
              currentLocation={currentLocation}
              setUser={setUser}
            />
          }
        />
        <Route path='/g/:groupId' element={<GroupDetail />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route
          path='/admin'
          element={
            user.admin ? <AdminPanel user={user} /> : <Navigate to='/' />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
