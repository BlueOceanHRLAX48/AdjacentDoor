import axios from 'axios';
import { useRef } from 'react';
import Post from './Post';
import MakePost from './MakePost';

function Feed({ filteredPosts, user }) {
  const postInput = useRef(null);

  const handleSubmit = (e) => {
    let postContent = {
      group_id: user.default_group.id,
      user_group_id: user.default_group.id,
      user_id: user.id,
      body: postInput.current.value,
      tag: 'Sell',
      privacy: false,
      latitude: 123,
      longitude: -456.5,
    };
    axios
      .post(
        `${process.env.REACT_APP_SERVER}/posts/defaultgroup?group_id=${user.default_group.id}`,
        postContent
      )
      .then((response) => {
        console.log(response);
      });
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
        {/* <MakePost /> */}
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
            coordinates={post.coordinates}
            tag={post.tag}
            postId={post.post_id}
            time={post.time}
            user={user}
          />
        ))}
    </div>
  );
}

export default Feed;
