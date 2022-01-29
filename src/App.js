import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import Home from './Home';
import Leaderboard from './Leaderboard';
import Login from './Login';
import MyProfile from './MyProfile';

function App() {
  const [user, setUser] = React.useState({
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
      { id: 1, name: 'Group Name' },
      { id: 42, name: 'Another Group' },
    ],
    admin: true,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route
          path='/admin'
          element={user.admin ? <AdminPanel /> : <Navigate to='/' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
