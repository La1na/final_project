import styles from "./MyProfilePage.module.css";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import avatar from "/src/assets/ICHavatar.png";
import likes from "/src/assets/navbarLogos/notifications.png";
import commentIcon from "/src/assets/navbarLogos/comment.png";


function MyProfilePage() {
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/my-posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  const openPost = async (post) => {
    setModalPost(post);
    try {
      const res = await axios.get(`http://localhost:3000/api/my-posts/${post._id}`);
      setComments(res.data.comments || []);
    } catch (error) {
      console.error("Error fetching comments for post:", error);
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
      await axios.post(`http://localhost:3000/api/my-posts/${modalPost._id}/comments`, {
        text: commentText,
      });
      const res = await axios.get(`http://localhost:3000/api/my-posts/${modalPost._id}`);
      setComments(res.data.comments || []);
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/editprofile');
  };

  return (
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.profileContainer}>
        <div className={styles.profileTop}>
          <img className={styles.avatar} src={avatar} alt="avatar" />
          <div className={styles.profileInfo}>
            <div className={styles.profile_name}>
            <h2 className={styles.username}>itcareerhub</h2>
            <button className={styles.editProfileButton} onClick={handleClick}>Edit profile</button>

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
            <p className={styles.bio}>• Гарантия помощи с трудоустройством в ведущие IT-компании</p>
            <p className={styles.bio}>• Выпускники зарабатывают от 45к евро БЕСПЛАТНАЯ</p>
            <a href="#" className={styles.link}>
              www.itcareerhub.dev
            </a>
          </div>
        </div>

        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <img
              key={post._id}
              // Constructing the full absolute URL for each post image based on UPLOAD_DIR=postsImg
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
                // Constructing the full absolute URL for the modal post image based on UPLOAD_DIR=postsImg
                src={`http://localhost:3000/postsImg/${modalPost.image}`}
                alt="post"
                className={styles.modalImage}
              />
              <div className={styles.modalRightColumn}>
                <div className={styles.modalHeader}>
                  <img src={avatar} alt="profile avatar" className={styles.modalAvatar} />
                  <span className={styles.modalUsername}>itcareerhub</span>
                </div>
                <div className={styles.modalDescriptionWrapper}>
                  <p className={styles.modalDescription}>{modalPost.description}</p>
                </div>

                <div className={styles.commentsSection}>
                  {comments.length === 0 ? (
                    <p className={styles.noComments}>No comments yet. Be the first to comment!</p>
                  ) : (
                    comments.map((c, i) => (
                      <div key={i} className={styles.comment}>
                        <img src={avatar} alt="commenter avatar" className={styles.commentAvatar} />
                        <div className={styles.commentTextContent}>
                          <p className={styles.commentText}>
                            <span className={styles.commentUsername}>username </span>
                            {c.text}
                          </p>
                          <div className={styles.commentMeta}>
                            <span className={styles.commentTime}>2h</span>
                            <span className={styles.commentLikes}>25 likes</span>
                            <button className={styles.replyButton}>Reply</button>
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
                  <button onClick={submitComment} className={styles.postCommentButton}>
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