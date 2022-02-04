import { Avatar, Tooltip } from '@mui/material';
import axios from 'axios';
import React from 'react';
import LeftBar from './LeftBar/index';
import { MdEdit } from 'react-icons/md';

function MyProfile({ user, setUser }) {
  const [username, setUsername] = React.useState(user.username);
  const [city, setCity] = React.useState(user.city);
  const [state, setState] = React.useState(user.state);
  const [zip, setZip] = React.useState(user.zip);
  const [profileImage, setProfileImage] = React.useState(user.profile_img);
  const [privacy, setPrivacy] = React.useState(user.privacy);
  const [edit, setEdit] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const backupImage = user.profile_img;

  function handleSave() {
    if (privacy !== user.privacy) {
      axios
        .put(`${process.env.REACT_APP_SERVER}/user/${user.network_id}/privacy`)
        .catch((err) => console.error(err));
    }
    if (username !== user.username) {
      axios
        .put(
          `${process.env.REACT_APP_SERVER}/user/${user.network_id}/displayName`,
          { username: username.trim() }
        )
        .catch((err) => console.error(err));
    }
    if (city !== user.city || zip !== user.zip || state !== user.state) {
      axios
        .put(
          `${process.env.REACT_APP_SERVER}/user/${user.network_id}/updateLocation`,
          { city: city.trim(), state: state.trim(), zip: zip.trim() }
        )
        .catch((err) => console.error(err));
    }
    if (profileImage !== user.profile_img) {
      axios
        .put(`${process.env.REACT_APP_SERVER}/user/${user.network_id}/photo`, {
          photo: profileImage.trim(),
        })
        .catch((err) => console.error(err));
    }
    setTimeout(() => {
      axios
        .get(`${process.env.REACT_APP_SERVER}/user/${user.network_id}`)
        .then((res) => {
          setUser(res.data);
          localStorage.setItem('AdjacentDoorUser', JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500);
    setEdit(false);
  }

  function handleCancel() {
    setProfileImage(user.profile_img);
    setUsername(user.username);
    setCity(user.city);
    setState(user.state);
    setZip(user.zip);
    setEdit(false);
  }

  function handleUpload(newPhoto) {
    if (!newPhoto[0]) {
      setProfileImage(backupImage);
      return;
    }
    setUploading(true);
    let formData = new FormData();
    formData.append('file', newPhoto[0]);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY}/image/upload`,
        formData
      )
      .then((res) => {
        setProfileImage(res.data.secure_url);
        setUploading(false);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className='flex dark:bg-gray-900 dark:text-white'>
      <div className='hidden sm:flex'>
        <LeftBar user={user} />
      </div>
      <div className='grow flex flex-col items-center p-8'>
        <div className='flex w-[600px] items-center justify-center p-8 border rounded-lg relative'>
          <Tooltip placement='left' title='Edit Information' arrow={true}>
            <button
              className='absolute top-4 right-4 hover:text-primary transition-all duration-150'
              onClick={() => setEdit(true)}
            >
              <MdEdit size='20px' />
            </button>
          </Tooltip>
          <Avatar
            alt={user.username}
            src={
              user.profile_img ||
              'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'
            }
            sx={{ width: 100, height: 100 }}
            className='mr-8'
          />
          <div className='text-base'>
            <div>Name: {user.username}</div>
            <div>Email: {user.email}</div>
            <div>
              Location: {user.city}, {user.state}, {user.zip}
            </div>
          </div>
        </div>
        {edit && (
          <div className='flex flex-col w-[600px] gap-4 items-center justify-center mt-8 p-8 pb-4 border rounded-lg'>
            <Avatar
              alt={user.username}
              src={
                profileImage ||
                'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'
              }
              sx={{ width: 80, height: 80 }}
              className=''
            />
            <div className='flex w-[500px]'>
              <input
                type='file'
                onChange={(e) => handleUpload(e.target.files)}
              />
              <div className='ml-auto font-bold animate-pulse'>
                {uploading ? 'Uploading...' : ''}
              </div>
            </div>
            <div className='flex w-[500px]'>
              <div className='w-[100px] font-semibold'>Photo:</div>
              <input
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                className='w-[400px] outline-1 border border-secondary focus:outline-primary rounded px-2'
              />
            </div>
            <div className='flex w-[500px]'>
              <div className='w-[100px] font-semibold'>Name:</div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-[400px] outline-1 border border-secondary focus:outline-primary rounded px-2'
              />
            </div>
            <div className='flex w-[500px]'>
              <div className='w-[100px] font-semibold'>City:</div>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='w-[400px] outline-1 border border-secondary focus:outline-primary rounded px-2'
              />
            </div>
            <div className='flex w-[500px]'>
              <div className='w-[100px] font-semibold'>State:</div>
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                className='w-[400px] outline-1 border border-secondary focus:outline-primary rounded px-2'
              />
            </div>
            <div className='flex w-[500px]'>
              <div className='w-[100px] font-semibold'>Zip:</div>
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className='w-[400px] outline-1 border border-secondary focus:outline-primary rounded px-2'
              />
            </div>
            <div className='flex items-center'>
              <div className='font-semibold pr-2'>Private Profile:</div>
              <input
                type='checkbox'
                checked={privacy}
                onChange={() => setPrivacy((x) => !x)}
              />
            </div>
            <div className='flex pt-4 gap-4 w-full justify-center'>
              <button
                className='rounded border border-red-400 hover:bg-red-300 transition-all duration-150 px-2 py-1 font-semibold'
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className='rounded border border-primary hover:bg-secondary transition-all duration-150 px-2 py-1 font-semibold disabled:opacity-50 disabled:hover:bg-transparent'
                onClick={handleSave}
                disabled={uploading}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
