import moment from 'moment';
import { useRef } from 'react';
import Post from './Post';

function Feed({ search, setSearch, posts, setPosts }) {
  const postInput = useRef(null);

  const handleSubmit = (e) => {
    let postContent = {
      avatar: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      name: 'name',
      date: moment().format('LL'),
      post_text: postInput.current.value,
      report: 0,
      likes: 0,
      latitude: '40.741895',
      longitude: '-73.989308',
    };
    setPosts([postContent, ...posts]);
    postInput.current.value = '';
    e.preventDefault();
  };

  return (
    <div className='w-full sm:w-[600px] px-4 mb-12 sm:mb-20'>
      <div className='hidden sm:block'>
        <form className='relative flex justify-center'>
          <textarea
            className='w-full h-10 p-1 px-3 text-sm border shadow-sm rounded-xl border-slate-100 focus:outline-none focus:ring-secondary focus:ring-2 focus:m-1 dark:bg-gray-900'
            placeholder='Write something...'
            ref={postInput}
          ></textarea>
          <button
            onClick={handleSubmit}
            className='absolute px-2 text-xs font-medium text-white rounded-full bg-primary bottom-2 right-4'
          >
            submit
          </button>
        </form>
      </div>
      {posts.map((post, i) => (
        <Post
          key={i}
          avatar={post.avatar}
          name={post.name}
          date={post.date}
          postBody={post.post_text}
          report={post.report}
          likes={post.likes}
        />
      ))}
    </div>
  );
}

export default Feed;
