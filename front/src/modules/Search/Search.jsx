
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Search.module.css";

function Search({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/api/users/search?q=${query}`);
        if (Array.isArray(res.data)) {
          setResults(res.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 300); 

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Search</h3>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className={styles.results}>
          {results.map((user) => (
            <div key={user._id} className={styles.resultItem}>
              <img src={user.avatar} alt={user.username} className={styles.avatar} />
              <span>{user.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;

