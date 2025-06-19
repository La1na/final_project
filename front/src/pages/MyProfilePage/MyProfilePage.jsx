import styles from "./MyProfilePage.module.css";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import likes from "/src/assets/navbarLogos/notifications.png";
import commentIcon from "/src/assets/navbarLogos/comment.png";
import avatar from "/src/assets/ICHavatar.png";

function MyProfilePage() {
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await axios.get("http://localhost:3000/api/my-posts");
        setPosts(postsRes.data);

        const usersRes = await axios.get("http://localhost:3000/api/users");
        if (usersRes.data.length > 2) {
          setUser(usersRes.data[2]);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
  }, []);

  const openPost = async (post) => {
    setModalPost(post);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/my-posts/${post._id}`
      );
      setComments(res.data.comments || []);
    } catch (error) {
      console.error("Ошибка загрузки комментариев:", error);
      setComments([]);
    }
  };

  const closeModal = () => {
    setModalPost(null);
    setCommentText("");
    setComments([]);
  };

  const submitComment = async () => {
    if (!commentText.trim() || !modalPost) return;
    try {
      await axios.post(
        `http://localhost:3000/api/my-posts/${modalPost._id}/comments`,
        {
          text: commentText,
        }
      );
      const res = await axios.get(
        `http://localhost:3000/api/my-posts/${modalPost._id}`
      );
      setComments(res.data.comments || []);
      setCommentText("");
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
    }
  };

  const handleEditProfile = () => navigate("/editprofile");

  return (
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.profileContainer}>
        <div className={styles.profileTop}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          <div className={styles.profileInfo}>
            <div className={styles.profile_name}>
              <h2 className={styles.username}>{user?.username || "..."}</h2>
              <button
                className={styles.editProfileButton}
                onClick={handleEditProfile}
              >
                Edit profile
              </button>
            </div>
            <div className={styles.stats}>
              <span>
                <b>{posts.length}</b> posts
              </span>
              <span>
                <b>124</b> followers
              </span>
              <span>
                <b>180</b> following
              </span>
            </div>
            <p className={styles.bio}>{user?.about}</p>
            <a href={user?.website || "#"} className={styles.link}>
              {user?.website}
            </a>
          </div>
        </div>

        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <img
              key={post._id}
              src={`http://localhost:3000/postsImg/${post.image}`}
              alt="post"
              className={styles.postImage}
              onClick={() => openPost(post)}
            />
          ))}
        </div>
      </div>

      {modalPost && (
        <>
          <div className={styles.backdrop} onClick={closeModal} />
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <img
                src={`http://localhost:3000/postsImg/${modalPost.image}`}
                alt="post"
                className={styles.modalImage}
              />
              <div className={styles.modalRightColumn}>
                <div className={styles.modalHeader}>
                  <span className={styles.modalUsername}>{user?.username}</span>
                </div>

                <div className={styles.modalDescriptionWrapper}>
                  <p className={styles.modalDescription}>
                    {modalPost.description}
                  </p>
                </div>

                <div className={styles.commentsSection}>
                  {comments.length === 0 ? (
                    <p className={styles.noComments}>
                      No comments yet. Be the first!
                    </p>
                  ) : (
                    comments.map((c, i) => (
                      <div key={i} className={styles.comment}>
                        <div className={styles.commentTextContent}>
                          <p className={styles.commentText}>
                            <span className={styles.commentUsername}>
                              username{" "}
                            </span>
                            {c.text}
                          </p>
                          <div className={styles.commentMeta}>
                            <span className={styles.commentTime}>2h</span>
                            <span className={styles.commentLikes}>
                              25 likes
                            </span>
                            <button className={styles.replyButton}>
                              Reply
                            </button>
                          </div>
                        </div>
                        <div className={styles.commentActions}>
                          <span className={styles.likeIcon}>♡</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className={styles.modalActions}>
                  <div className={styles.postIcons}>
                    <img src={likes} alt="likes" />
                    <img src={commentIcon} alt="comments" />
                  </div>
                  <span className={styles.likesCount}>25 likes</span>
                  <span className={styles.postTime}>1 HOUR AGO</span>
                </div>

                <div className={styles.commentForm}>
                  <input
                    type="text"
                    value={commentText}
                    placeholder="Add a comment..."
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    onClick={submitComment}
                    className={styles.postCommentButton}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default MyProfilePage;
