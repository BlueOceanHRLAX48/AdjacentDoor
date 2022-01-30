// const getAllPosts = `SELECT p.post_id,
//                     (select coalesce(json_agg(user_info)) from (select username, profile_img from user_account where user_id=1) as user_info),
//                     p.body, p.time, p.like, p.report, p.tag, p.privacy, p.latitude, p.longitude from posts p`;
const addPost = `INSERT INTO posts(group_id, user_group_id, user_id, body, "time", "like", report, tag, privacy, latitude, longitude)
                VALUES ($1, NULL, 1, 'here is a post body', DEFAULT, DEFAULT, DEFAULT, 'random', DEFAULT, 123.2, 234.3);`;


const getAllPosts = `SELECT p.post_id,
                (SELECT json_agg(u) FROM (SELECT username, profile_img FROM user_account WHERE user_account.user_id=p.user_id) AS u) AS user_info,
                p.body, p.time, p.like, p.report, p.tag, p.privacy, json_build_object('latitude', p.latitude, 'longitude', p.longitude) AS location,
                coalesce(json_agg(i) FILTER (WHERE i.post_id IS NOT NULL), '[]') AS photos
               FROM posts p
               LEFT JOIN post_imgs i ON p.post_id = i.post_id
               WHERE group_id = $1
               GROUP BY p.post_id;`;
module.exports = {
  getAllPosts,
  addPost
};