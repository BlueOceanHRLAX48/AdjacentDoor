import React from 'react';
import Post from './Post';

function Feed(props) {
  return (
    <div className='w-full sm:w-[600px] px-4 mb-32 sm:mb-20'>
      {props.filteredPosts.map((post, i) => (
        <Post
          key={i}
          post={post}
          photos={post.photos}
          body={post.body}
          privacy={post.privacy}
          report={post.report}
          like={post.like}
          coordinates={post.coordinates}
          tag={post.tag}
          postId={post.post_id}
          time={post.time}
          user={props.user}
          getPosts={props.getPosts}
        />
      ))}
    </div>
  );
}

export default Feed;
