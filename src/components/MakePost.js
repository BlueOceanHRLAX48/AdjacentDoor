import React from 'react';
import { MdClose, MdAdd } from 'react-icons/md';
import { TextareaAutosize, Tooltip } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MakePost(props) {
  const [body, setBody] = React.useState('');
  const [type, setType] = React.useState('general');
  const [privacy, setPrivacy] = React.useState(false);
  const [files, setFiles] = React.useState();
  const [uploadURLs, setUploadURLS] = React.useState([]);

  const groupId = useParams().groupId;

  function handleClear() {
    setBody('');
    setType('general');
    setUploadURLS([]);
    setFiles();
    setPrivacy(false);
  }

  async function handleUpload(inputFiles) {
    let uploads = [];
    setFiles(inputFiles);
    for (let i = 0; i < inputFiles.length; i++) {
      let formData = new FormData();
      formData.append('file', inputFiles[i]);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY}/image/upload`,
          formData
        )
        .then((res) => {
          uploads.push(res.data.secure_url);
        })
        .catch((err) => console.error(err));
    }
    setUploadURLS(uploads);
  }

  const path = window.location.pathname;

  function handleSubmit() {
    axios
      .post(
        `${process.env.REACT_APP_SERVER}/posts/${
          path === '/' ? 'defaultgroup' : 'usergroup'
        }`,
        path === '/'
          ? {
              group_id: props.user.default_group.id,
              user_id: props.user.user_id,
              body: body.trim(),
              tag: type,
              privacy,
              latitude: props.currentLocation.latitude,
              longitude: props.currentLocation.longitude,
              photos: uploadURLs,
            }
          : {
              user_group_id: groupId,
              user_id: props.user.user_id,
              body: body.trim(),
              tag: type,
              privacy,
              latitude: props.currentLocation.latitude,
              longitude: props.currentLocation.longitude,
              photos: uploadURLs,
            }
      )
      .then((res) => {
        axios
          .put(
            `${process.env.REACT_APP_SERVER}/user/${props.user.network_id}/contribution/add`
          )
          .catch((err) => console.error(err));
        setBody('');
        setType('general');
        setPrivacy(false);
        setFiles();
        setUploadURLS([]);
        props.refresh();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className='hidden sm:flex pt-4 sm:pt-0 w-screen sm:w-[600px] px-4' id='create-post'>
      <div className='w-full p-4 border rounded-lg'>
        <div className='flex items-center'>
          <Tooltip title='Clear Everything' placement='right' arrow={true}>
            <span>
              <button onClick={handleClear} className='disabled:opacity-50'>
                <MdClose size={25} className='text-secondary' />
              </button>
            </span>
          </Tooltip>
          <select
            className='mb-2 ml-4 text-xl font-semibold outline-none text-primary'
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value='general'>General</option>
            <option value='forsale'>For Sale</option>
            <option value='safety'>Safety</option>
          </select>
          <button
            className='px-4 py-2 ml-auto font-semibold rounded disabled:opacity-50 bg-primary'
            disabled={!body}
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
        <TextareaAutosize
          className='w-full px-1 mt-4 outline-none h-fit hideResizer hide-scroll-bar'
          placeholder='Share something with the group...'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxRows={10}
        />
        <input
          type='file'
          id='file'
          className='absolute opacity-0 -z-50'
          onChange={(e) => handleUpload(e.target.files)}
          multiple
        />
        <div className='flex items-center'>
          <label
            htmlFor='file'
            className='flex items-center gap-1 font-semibold cursor-pointer text-primary w-fit'
          >
            <MdAdd size={25} />
            {files?.length ? 'Change' : 'Add'} Photos
          </label>
          <div className='pl-4 cursor-default text-secondary'>
            {files?.length > uploadURLs.length &&
              `Uploading ${files?.length} Images`}
            {files?.length === uploadURLs.length
              ? `${files?.length} Image${
                  files?.length === 1 ? '' : 's'
                } Uploaded`
              : ''}
          </div>
          <div
            className={`ml-auto flex ${
              privacy ? 'text-primary' : 'text-secondary'
            }`}
          >
            <button
              className='font-semibold'
              onClick={() => setPrivacy((x) => !x)}
            >
              {privacy ? 'Private' : 'Public'}
            </button>
          </div>
        </div>
        {uploadURLs.length > 0 && (
          <div className='mt-2 font-bold'>
            Preview:
            <div className='flex gap-2 pt-2'>
              {uploadURLs.map((image, i) => (
                <img
                  src={image}
                  width='50px'
                  alt={`upload ${i}`}
                  key={i}
                  className='border border-black'
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MakePost;
