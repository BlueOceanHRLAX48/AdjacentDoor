DROP DATABASE IF EXISTS blueocean;
CREATE DATABASE blueocean;

\c blueocean
DROP TABLE IF EXISTS user_account CASCADE;
CREATE TABLE IF NOT EXISTS user_account(
  user_id SERIAL NOT NULL PRIMARY KEY,
  firstName text NOT NULL,
  lastName text NOT NULL,
  username text NOT NULL,
  email text NOT NULL,
  "address" text NOT NULL,
  city text NOT NULL,
  "state" text NOT NULL,
  zip text not NULL,
  privacy boolean DEFAULT false,
  profile_img text not NULL,
  contribution int NOT NULL DEFAULT 0,
  default_groupID int NOT NULL,
  network_id text
);

DROP TABLE IF EXISTS default_groups CASCADE;
CREATE TABLE IF NOT EXISTS default_groups(
  id SERIAL NOT NULL PRIMARY KEY,
  "name" text NOT NULL,
  city text NOT NULL,
  "state" text NOT NULL,
  zip text NOT NULL,
  coordinates text NOT NULL,
  photo text NOT NULL,
  "safety" int NOT NULL DEFAULT 0,
  friendliness int NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS user_groups CASCADE;
CREATE TABLE IF NOT EXISTS user_groups(
  id SERIAL NOT NULL PRIMARY KEY,
  "name" text NOT NULL,
  admin_id int NOT NULL REFERENCES user_account(user_id),
  user_id int NOT NULL REFERENCES user_account(user_id),
  city text NOT NULL,
  "state" text NOT NULL,
  zip text NOT NULL,
  coordinates text NOT NULL,
  privacy boolean DEFAULT false,
  photo text NOT NULL,
  "safety" int NOT NULL DEFAULT 0,
  friendliness int NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE posts(
	post_id SERIAL NOT NULL PRIMARY KEY,
	group_id INT DEFAULT 0 REFERENCES default_groups(id),
  user_group_id INT DEFAULT 0 REFERENCES user_groups(id),
	user_id INT NOT NULL REFERENCES user_account(user_id),
	body TEXT NOT NULL,
	"time" TIMESTAMP DEFAULT now(),
	"like" INT DEFAULT 0,
	report INT DEFAULT 0,
	tag TEXT,
	privacy boolean DEFAULT false,
  coordinates TEXT
);

DROP TABLE IF EXISTS post_imgs CASCADE;
CREATE TABLE IF NOT EXISTS post_imgs(
	id SERIAL NOT NULL,
	post_id INT NOT NULL REFERENCES posts(post_id),
	image_url TEXT
);

DROP TABLE IF EXISTS replies CASCADE;
CREATE TABLE IF NOT EXISTS replies(
  id serial NOT NULL,
  user_id int NOT NULL REFERENCES user_account(user_id),
  post_id int NOT NULL REFERENCES posts(post_id),
  body text NOT NULL,
  report int NOT NULL DEFAULT 0,
  "like" int NOT NULL DEFAULT 0,
  "time" TIMESTAMP DEFAULT now(),
  coordinates TEXT
);


SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('user_account', 'user_id')), (SELECT (MAX("user_id") + 1) FROM "user_account"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('posts', 'post_id')), (SELECT (MAX("post_id") + 1) FROM "posts"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('post_imgs', 'id')), (SELECT (MAX("id") + 1) FROM "post_imgs"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('replies', 'id')), (SELECT (MAX("id") + 1) FROM "replies"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('default_groups', 'id')), (SELECT (MAX("id") + 1) FROM "default_groups"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('user_groups', 'id')), (SELECT (MAX("id") + 1) FROM "user_groups"), FALSE);

