import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/post/profile/${username}`)
        : await axios.get(`/post/timeline/60f1b2a55fb9391cf0e002c5`)
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
