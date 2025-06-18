import React from "react";
import axios from "axios";
import { useState } from "react";
import styles from "./PostCard.module.css";
import likes from "/src/assets/navbarLogos/notifications.png";
import comment from "/src/assets/navbarLogos/comment.png";
const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return `${seconds} сек. назад`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} мин. назад`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч. назад`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} дн. назад`;
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};
const PostCard = ({ post }) => {
  const [likesCount, setLikesCount] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    try {
      const response = await axios.post(`http://localhost:3000/api/posts/${post._id}/like`);
      if (response.status === 200) {
        setLikesCount((prev) => prev + 1);
        setLiked(true);
      }
    } catch (error) {
      console.error("Ошибка при лайке:", error);
    }
  };

  return (
    <div key={post._id} className={styles.post_card}>
      <div className={styles.post_header}>
        <img
          src={post.username?.avatar || "default-avatar.png"}
          alt="avatar"
          className={styles.avatar}
        />
        <div className={styles.user_info}>
          <span className={styles.username}>
            {post.username?.username ?? "Unknown"}
          </span>
          <span className={styles.dot}>•</span>
          <span className={styles.time}>{getTimeAgo(post.createdAt)}</span>
        </div>
        <button className={styles.follow_btn}>follow</button>
      </div>

      {post.imageUrl && (
        <div className={styles.postcardImg_container}>
          <img src={post.imageUrl} alt="post" className={styles.post_image} />
        </div>
      )}

      <div className={styles.post_content}>
        <div className={styles.likeAndComment_img}>
          <img className={styles.likeImg} src={likes} alt="" onClick={handleLike} />
          <img className={styles.commentsImg} src={comment} alt="" />
        </div>

        <p className={styles.likes}>{likesCount} likes</p>
        <p className={styles.caption}>
          <strong className={styles.usernameCaption}>{post.username?.username ?? "Unknown"}</strong>{" "}
          <em>{post.caption}</em>
        </p>

        {post.comments && post.comments.length > 0 && (
          <>
            <p className={styles.comment}>
              <strong>
                {(post.comments[0].username || post.username?.username) ??
                  "Unknown"}
              </strong>{" "}
              {post.comments[0].text}
            </p>

            {post.comments.length > 1 && (
              <p className={styles.view_all}>
                View all comments ({post.comments.length})
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
