import Post from './Post';

function Feed({ filteredPosts, user, getPosts, currentLocation }) {
  return (
    <div className='w-full sm:w-[600px] p-4 mb-12 sm:mb-20'>
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
