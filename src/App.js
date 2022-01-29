import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
<<<<<<< HEAD
import MyProfile from './MyProfile';
=======
import Groups from './Groups/Groups';
>>>>>>> dc7d299 (cleaned up group code)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
      </Routes>
<<<<<<< HEAD
=======

      <Groups />{/* Temporary locaiton to test Groups */}
>>>>>>> dc7d299 (cleaned up group code)
    </BrowserRouter>
  );
}

export default App;
