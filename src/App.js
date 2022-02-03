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

function App() {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('AdjacentDoorUser')) || {}
  );
  // DEMO: IF YOU KEEP GETTING REDIRECTED TO /LOGIN, ADD THIS TO THE ABOVE USER STATE OBJECT (MAKE SURE YOURE USING DEPLOYED DB): network_id: '116946549505913178009'

  const [currentLocation, setCurrentLocation] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/user/${user.network_id}`)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('AdjacentDoorUser', JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error("User doesn't exist");
        localStorage.removeItem('AdjacentDoorUser');
        setUser({});
      });
  }, [user.network_id]);

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
        <Route path='*' element={<Navigate to='/login' />} />
        <Route
          path='/'
          element={
            user.network_id ? (
              <Home user={user} setUser={setUser} currentLocation={currentLocation} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/login'
          element={user.network_id ? <Navigate to='/' /> : <Login setUser={setUser} />}
        />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route
          path='/groups'
          element={<Groups user={user} currentLocation={currentLocation} setUser={setUser} />}
        />
        <Route
          path='/g/:groupId'
          element={<GroupDetail user={user} setUser={setUser} currentLocation={currentLocation} />}
        />
        <Route path='/leaderboard' element={<Leaderboard user={user} />} />
        <Route
          path='/admin'
          element={user.admin ? <AdminPanel user={user} /> : <Navigate to='/' />}
        />
      </Routes>

      {window.location.pathname !== '/signup' || window.location.pathname !== '/login' ? (
        <div>
          <Footer />
        </div>
      ) : null}
    </BrowserRouter>
  );
}

export default App;
