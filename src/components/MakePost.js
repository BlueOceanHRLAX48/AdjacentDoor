import React from 'react';
import { MdClose, MdAdd } from 'react-icons/md';
import { TextareaAutosize, Tooltip } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MakePost(props) {
  const [body, setBody] = React.useState('');
  const [type, setType] = React.useState('');
  const [privacy, setPrivacy] = React.useState(false);
  const [files, setFiles] = React.useState();

  const groupId = useParams().groupId;

  function handleClear() {
    setBody('');
    setType('');
  }

  function handleSubmit() {
    axios.post(`${process.env.REACT_APP_SERVER}/posts/usergroup`, {
      user_group_id: groupId,
      user_id: props.user.user_id,
      body: body.trim(),
      tag: type,
      privacy,
      latitude: props.currentLocation.latitude,
      longitude: props.currentLocation.longitude,
    });
    setBody('');
    setType('');
    setPrivacy(false);
    props.refresh();
  }

  return (
    <div className='w-[600px] px-4 pt-6'>
      <div className='w-full border p-4 rounded-lg'>
        <div className='flex items-center'>
          <Tooltip title='Clear Everything' placement='right' arrow={true}>
            <span>
              <button
                onClick={handleClear}
                disabled={!body && !type}
                className='disabled:opacity-50'
              >
                <MdClose size={25} className='text-secondary' />
              </button>
            </span>
          </Tooltip>
          <select
            className='ml-4 text-primary font-semibold text-xl mb-2 outline-none'
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value=''>Select Post Type</option>
            <option value='general'>General</option>
            <option value='forsale'>For Sale</option>
            <option value='safety'>Safety</option>
          </select>
          <button
            className='ml-auto disabled:opacity-50 bg-primary font-semibold rounded px-4 py-2'
            disabled={!body || !type}
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
        <TextareaAutosize
          className='h-fit hideResizer hide-scroll-bar w-full mt-4 px-1 outline-none'
          placeholder='Share something with the group...'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxRows={10}
        />
        <input
          type='file'
          id='file'
          className='absolute -z-50 opacity-0'
          onChange={(e) => setFiles(e.target.files)}
          multiple
        />
        <div className='flex items-center'>
          <label
            htmlFor='file'
            className='flex items-center text-primary font-semibold cursor-pointer w-fit gap-1'
          >
            <MdAdd size={25} />
            {files?.length ? 'Change' : 'Add'} Photos
          </label>
          <div className='pl-4 text-secondary cursor-default'>
            {files?.length
              ? `${files?.length} Image${
                  files?.length === 1 ? '' : 's'
                } Uploaded`
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakePost;
