const getAllPosts = `SELECT p.post_id,
                (SELECT row_to_json(u) FROM (SELECT username, profile_img FROM user_account WHERE user_account.user_id=p.user_id) u ) AS user_info,
                p.body, p.time, p.like, p.report, p.tag, p.privacy,
                json_build_object('latitude', p.latitude, 'longitude', p.longitude) AS location,
                coalesce(json_agg(i) FILTER (WHERE i.post_id IS NOT NULL), '[]') AS photos
               FROM posts p
               LEFT JOIN post_imgs i ON p.post_id = i.post_id
               WHERE group_id = $1
               GROUP BY p.post_id
               ORDER BY p.time DESC;`;

const addPost = `INSERT INTO posts(group_id, user_group_id, user_id, body, "time", "like", report, tag, privacy, latitude, longitude)
                VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT, DEFAULT, $5, $6, $7, $8)
                RETURNING post_id;`;

const addPostImage = `INSERT INTO post_imgs(post_id, image_url)
                      VALUES ($1, $2);`

const getAllPostsUsers = `SELECT p.post_id,
                        (SELECT row_to_json(u) FROM (SELECT username, profile_img FROM user_account WHERE user_account.user_id=p.user_id) u ) AS user_info,
                        p.body, p.time, p.like, p.report, p.tag, p.privacy,
                        json_build_object('latitude', p.latitude, 'longitude', p.longitude) AS location,
                        coalesce(json_agg(i) FILTER (WHERE i.post_id IS NOT NULL), '[]') AS photos
                        FROM posts p
                        LEFT JOIN post_imgs i ON p.post_id = i.post_id
                        WHERE user_group_id = $1
                        GROUP BY p.post_id
                        ORDER BY p.time DESC;`;

const likePost = `UPDATE posts SET "like" = "like" + 1
                  WHERE post_id = $1;`;

const reportPost = `UPDATE posts SET report = report + 1
                    WHERE post_id = $1;`;
module.exports = {
  getAllPosts,
  addPost,
  addPostImage,
  getAllPostsUsers,
  likePost,
  reportPost
};