import { Avatar } from '@mui/material';
import moment from 'moment';

function Comment({ comment }) {
  function handleTime(timestamp) {
    timestamp = timestamp + 'Z';
    return moment().isSame(timestamp, 'day')
      ? moment(timestamp).fromNow()
      : moment(timestamp).format('LL');
  }

  return (
    <div className='flex pt-4 border-t'>
      <Avatar
        alt='avatar'
        src={
          comment.user_photo ||
          'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png'
        }
        sx={{ width: 40, height: 40 }}
        className='mt-1 ml-1 mr-6 ring-2 ring-offset-2 ring-primary'
      />
      <div className='w-full'>
        <div className='flex items-center'>
          <div className='flex mr-2 font-medium text-xs align-top'>
            {comment?.username}
          </div>

          <> · </>

          <div className='ml-2 text-xs font-light text-slate-500'>
            {handleTime(comment?.time)}
          </div>
        </div>
        <div className='mt-2'>{comment?.body}</div>
      </div>
    </div>
  );
}

export default Comment;
