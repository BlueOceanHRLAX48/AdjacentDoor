import moment from 'moment';
import { useRef } from 'react';
import Post from './Post';
import axios from 'axios';

function Feed({ search, setSearch, posts, setPosts, filteredPosts, setFilteredPosts }) {
  const postInput = useRef(null);

  const handleSubmit = (e) => {
    let postContent = {
      photos: [],
      body: postInput.current.value,
      privacy: false,
      report: 0,
      like: 0,
      userInfo: {
        username: 'ez',
        profile_img: '1234.com',
      },
      coordinates: {
        latitude: 123,
        longitude: -456.5,
      },
      tag: 'Sell',
      id: 1,
      time: moment().format('LL'),
    };

    axios.post(`http://localhost:3001/posts/defaultgroup?group_id=1`, postContent);
    // setFilteredPosts([postContent, ...filteredPosts]);
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
      {filteredPosts &&
        filteredPosts.map((post, i) => (
          <Post
            key={i}
            photos={post.photos}
            body={post.body}
            privacy={post.privacy}
            report={post.report}
            like={post.like}
            userInfo={post.user_info}
            coordinates={post.coordinates}
            tag={post.tag}
            id={post.post_id}
            time={post.time}
          />
        ))}
    </div>
  );
}

export default Feed;
