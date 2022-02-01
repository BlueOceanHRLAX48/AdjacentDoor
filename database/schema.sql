DROP DATABASE IF EXISTS blueocean;
CREATE DATABASE blueocean;
\c blueocean
DROP TABLE IF EXISTS user_account CASCADE;
CREATE TABLE IF NOT EXISTS user_account(
  user_id SERIAL NOT NULL PRIMARY KEY,
  firstName text NOT NULL,
  lastName text NOT NULL,
  username text NOT NULL DEFAULT null,
  email text NOT NULL,
  network_id text NOT NULL UNIQUE,
  "admin" BOOLEAN DEFAULT false,
  "address" text NOT NULL,
  city text NOT NULL,
  "state" text NOT NULL,
  zip text not NULL,
  privacy boolean DEFAULT false,
  profile_img text not NULL,
  contribution int NOT NULL DEFAULT 0,
  default_groupID int NOT NULL
);

DROP TABLE IF EXISTS default_groups CASCADE;
CREATE TABLE IF NOT EXISTS default_groups(
  id SERIAL NOT NULL PRIMARY KEY,
  "name" text NOT NULL,
  city text NOT NULL,
  "state" text NOT NULL,
  zip text NOT NULL,
  photo text NOT NULL,
  "safety" int NOT NULL DEFAULT 0,
  friendliness int NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS user_groups CASCADE;
CREATE TABLE IF NOT EXISTS user_groups(
  id SERIAL NOT NULL PRIMARY KEY,
  "name" text NOT NULL,
  admin_id text NOT NULL,
  "address" text NOT NULL,
  city text NOT NULL,
  "state" text NOT NULL,
  zip text not NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  privacy boolean DEFAULT false,
  photo text NOT NULL,
  "safety" int NOT NULL DEFAULT 0,
  friendliness int NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS user_group_list CASCADE;
CREATE TABLE user_group_list(
  id SERIAL NOT NULL PRIMARY KEY,
  user_id int NOT NULL REFERENCES user_account(user_id),
  network_id text,
  user_group_id int NOT NULL,
  accepted boolean NOT NULL DEFAULT false,
  FOREIGN KEY (network_id)
  REFERENCES user_account(network_id)
  ON DELETE CASCADE,
  FOREIGN KEY (user_group_id)
  REFERENCES user_groups(id)
  ON DELETE CASCADE
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
  latitude float NOT NULL,
  longitude float NOT NULL,
  deleted boolean DEFAULT false
);

DROP TABLE IF EXISTS post_imgs CASCADE;
CREATE TABLE IF NOT EXISTS post_imgs(
	id SERIAL NOT NULL,
	post_id INT NOT NULL REFERENCES posts(post_id),
	image_url TEXT
);

DROP TABLE IF EXISTS replies CASCADE;
CREATE TABLE replies(
  id serial NOT NULL,
  user_id int NOT NULL REFERENCES user_account(user_id),
  username text NOT NULL,
  post_id int NOT NULL REFERENCES posts(post_id),
  reply text NOT NULL,
  report int NOT NULL DEFAULT 0,
  "like" int NOT NULL DEFAULT 0,
  "time" TIMESTAMP DEFAULT now(),
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);


SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('user_account', 'user_id')), (SELECT (MAX("user_id") + 1) FROM "user_account"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('posts', 'post_id')), (SELECT (MAX("post_id") + 1) FROM "posts"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('post_imgs', 'id')), (SELECT (MAX("id") + 1) FROM "post_imgs"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('replies', 'id')), (SELECT (MAX("id") + 1) FROM "replies"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('default_groups', 'id')), (SELECT (MAX("id") + 1) FROM "default_groups"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('user_groups', 'id')), (SELECT (MAX("id") + 1) FROM "user_groups"), FALSE);

INSERT INTO user_account(firstName, lastName, username, email, network_id,address, city, state, zip, profile_img, privacy, contribution, default_groupID)
VALUES ('ernest','zhang','ez', '12345@gmail.com', '1124asfas','1234 street st', 'city', 'state', '5678', '1234.com', DEFAULT, DEFAULT, 1);

INSERT INTO user_account(firstName, lastName, username,  email, network_id, address, city, state, zip, profile_img, privacy, contribution, default_groupID)
VALUES ('ernst','zheng', 'ez123','23456@gmail.com', '12l5kjasf','2345 street st', 'city1', 'state1', '1234', '1sf.com', DEFAULT, DEFAULT, 3);

INSERT INTO user_account(firstName, lastName, username,  email, network_id, address, city, state, zip, profile_img, privacy, contribution, default_groupID)
VALUES ('arnest','zhung', 'ez456','afas@gmail.com', '09afaspoi','3456 street st', 'city2', 'state2', '7890', 'asd.com', DEFAULT, DEFAULT, 2);

INSERT INTO user_groups(name, admin_id, address, city, state, zip, latitude, longitude,privacy, photo, safety, friendliness )
VALUES ('the group', 1, '1234 street st', 'city', 'state', '5678', 123, -456, DEFAULT, '1234.com', DEFAULT, DEFAULT);

INSERT INTO user_groups(name, admin_id, address, city, state, zip, latitude, longitude,privacy, photo, safety, friendliness )
VALUES ('the second group', 1, '1234 street st', 'city', 'state', '5678', 123, -456, DEFAULT, '1234.com', DEFAULT, DEFAULT);

INSERT INTO default_groups(name, city, state, zip, photo, safety, friendliness)
VALUES ('the place', 'city', 'state', '5678', 'photo.com', DEFAULT, DEFAULT);

INSERT INTO user_group_list(user_id, network_id, user_group_id, accepted) VALUES (1, '1124asfas', 1, true), (2, '12l5kjasf', 1,true), (3, '09afaspoi', 1, true);

INSERT INTO user_group_list(user_id, network_id, user_group_id, accepted) VALUES (1, '1124asfas', 2,true), (3, '09afaspoi', 2, true);

INSERT INTO posts(group_id, user_group_id, user_id, body, time, report, tag, privacy, latitude, longitude)
VALUES(1, null, 1, 'asfasfasf', default, default,  'Sell', default, 123, -456.5);

INSERT INTO replies(user_id, username, post_id, reply, report,  time, latitude, longitude)
VALUES(2, 'username', 1, 'hihi', default, default,  567, 123.5);

INSERT INTO replies(user_id,  username, post_id, reply, report,  time, latitude, longitude)
VALUES(3, 'gggggg', 1, 'byebye', default, default,  456, 89.5);

