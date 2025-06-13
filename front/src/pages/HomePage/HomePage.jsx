import React, { useEffect, useState } from "react";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import { fetchPosts } from "../../shared/api/postsApi";
import styles from "./HomePage.module.css";
import all_seen from "../../assets/all_seen.png";
import PostCard from "./PostCard/PostCard";
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

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error(err);
        setError("Не удалось загрузить посты");
      });
  }, []);

  return (
    <div>
      <div className={styles.whole_container}>
        <Header />

        <div className={styles.main_content_area}>
          {error && <p className={styles.error_message}>{error}</p>}

          <div className={styles.posts_container}>
            {posts.map((post) => (
              // <div key={post._id} className={styles.post_card}>
              //   <div className={styles.post_header}>
              //     <img
              //       src={post.user.avatar}
              //       alt="avatar"
              //       className={styles.avatar}
              //     />
              //     <div className={styles.user_info}>
              //       <span className={styles.username}>
              //         {post.user.username}
              //       </span>
              //       <span className={styles.dot}>•</span>
              //       <span className={styles.time}>
              //         {getTimeAgo(post.createdAt)}
              //       </span>
              //     </div>
              //     <button className={styles.follow_btn}>follow</button>
              //   </div>

              //   <div className={styles.postcardImg_container}>
              //     <img
              //       src={post.imageUrl}
              //       alt="post"
              //       className={styles.post_image}
              //     />
              //   </div>

              //   <div className={styles.post_content}>
              //     <p className={styles.likes}>{post.likes} likes</p>
              //     <p className={styles.caption}>
              //       <strong>{post.user.username}</strong>{" "}
              //       <em>{post.caption}</em>
              //     </p>

              //     {post.comments && post.comments.length > 0 && (
              //       <>
              //         <p className={styles.comment}>
              //           <strong>
              //             {post.comments[0].username || post.user.username}
              //           </strong>{" "}
              //           {post.comments[0].text}
              //         </p>

              //         {post.comments.length > 1 && (
              //           <p className={styles.view_all}>
              //             View all comments ({post.comments.length})
              //           </p>
              //         )}
              //       </>
              //     )}
              //   </div>
              // </div>
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          <div className={styles.all_updates_message}>
            <div className={styles.checkmark_circle}>
              <img src={all_seen} alt="Checkmark" />
            </div>
            <p className={styles.top_message}>You've seen all the updates</p>
            <p className={styles.bottom_message}>
              You have viewed all new publications
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
