import axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import Footer from './components/Footer';
import GroupDetail from './GroupDetail';
import Groups from './Groups/Groups';
import Home from './Home';
import Leaderboard from './Leaderboard';
import Login from './Login';
import MyProfile from './MyProfile';
import SignUp from './SignUp';
import MakePost from './components/MakePost';

function App() {
  const [user, setUser] = useState(
    () =>
      JSON.parse(localStorage.getItem('AdjacentDoorUser')) || {
        user_id: 1,
        firstname: 'ernest',
        lastname: 'zhang',
        username: 'ez',
        network_id: '1124asfas',
        email: '12345@gmail.com',
        admin: true,
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
            accepted: true
          },
          {
            id: 2,
            name: 'the second group',
            accepted: false
          },
        ],
      }
  );

  const [currentLocation, setCurrentLocation] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${user.network_id}`)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('AdjacentDoorUser', JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error("User doesn't exist");
        setUser({});
      });

    navigator.geolocation.getCurrentPosition((res) =>
      setCurrentLocation({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
      })
    );
  }, [user.network_id]);

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
        <Route path='/' element={<Home user={user} setUser={setUser} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route
          path='/groups'
          element={<Groups user={user} currentLocation={currentLocation} setUser={setUser} />}
        />
        <Route path='/g/:groupId' element={<GroupDetail user={user} />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/create-post' element={<MakePost />} />
        <Route
          path='/admin'
          element={user.admin ? <AdminPanel user={user} /> : <Navigate to='/' />}
        />
      </Routes>
      <div>
        <Footer groupId={user.default_group.id} />
      </div>
    </BrowserRouter>
  );
}

export default App;
