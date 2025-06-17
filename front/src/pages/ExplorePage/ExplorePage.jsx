
import React, { useState, useEffect } from "react";
import styles from "./ExplorePage.module.css";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";

function Explore() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles["explorePageWrapper"]}>
      <Header />
      <div className={styles["exploreContent"]}>
        <div className={styles["exploreGrid"]}>
          {posts.map((post) => (
            <div
              key={post._id}
              className={styles["exploreGridItem"]}
              onClick={() => openModal(post.imageUrl)}
            >
              <img src={post.imageUrl} alt={post.caption || "Explore post"} />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className={styles["modalOverlay"]} onClick={closeModal}>
            <div
              className={styles["modalContent"]}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged"
                className={styles["modalImage"]}
              />
              <button
                className={styles["modalCloseButton"]}
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Explore;
