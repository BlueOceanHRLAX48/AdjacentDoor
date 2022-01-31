import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import Home from './Home';
import Leaderboard from './Leaderboard';
import Login from './Login';
import MyProfile from './MyProfile';
import Groups from './Groups/Groups';
import SignUp from './SignUp';

function App() {
  const [user, setUser] = useState({
    userID: 1,
    firstName: 'Demo',
    lastName: 'BlueOcean',
    username: 'demoblueocean',
    email: 'demo@blueocean.com',
    address: '123 Demo Street, Santa Monica, CA, 90210',
    city: 'Santa Monica',
    state: 'CA',
    zip: '90210',
    privacy: false,
    profileImage:
      'https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png',
    network_id: 'asnd19823y19231231akjsd',
    contribution: 10,
    defaultGroupId: 90210,
    userGroupIds: [
      { id: 1, name: 'Group Name', joinStatus: 'joined' },
      { id: 2, name: 'Another Group', joinStatus: 'pending' },
    ],
    admin: true,
  });
  const [currentLocation, setCurrentLocation] = React.useState({});

  React.useEffect(() => {
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
