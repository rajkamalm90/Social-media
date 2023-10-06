import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

export default function Home() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }

    fetch("http://localhost:5000/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) =>
          post._id === result._id ? result : post
        );
        setData(newData);
        console.log(result);
      });
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) =>
          post._id === result._id ? result : post
        );
        setData(newData);
        console.log(result);
      });
  };

  const makeComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) =>
          post._id === result._id ? result : post
        );
        setData(newData);
        setComment("");
        notifyB("Comment posted");
        console.log(result);
      });
  };

  const handleShareFile = (post) => {
    console.log("post", post);
    if (navigator.share) {
      navigator
        .share({
          title: "Title share",
          text: "Title share with me",
          url: post.photo,
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      const shareWindow = window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          post.photo
        )}`,
        "_blank",
        "height=400,width=600"
      );
      if (!shareWindow) {
        alert("Please allow pop-ups for this site.");
      }
    }
  };

  return (
    <div className="home">
      {data.map((post) => (
     <div className="card" key={post._id}>
        <div className="card-header">
          <div className="card-pic">
              <img src={post.postedBy?.Photo || picLink} alt=""/>
            </div>
            <h5>
              <Link to={`/profile/${post.postedBy?._id}`}>
                {post.postedBy?.name}
              </Link>
            </h5>
          </div>
          <div className="card-image">
            <img src={post.photo} alt="" />
          </div>
          <div className="card-content">
            {post.likes.includes(
              JSON.parse(localStorage.getItem("user"))._id
            ) ? (
              <span
          className="material-symbols-outlined material-symbols-outlined-red"
                onClick={() => unlikePost(post._id)}>
            favorite
              </span>
            ) : (
              <span
                className="material-symbols-outlined"
                onClick={() => likePost(post._id)}>
                favorite
              </span>
            )}
            <p>{post.likes.length} Likes</p>
            <p>{post.body} </p>
            <p
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => toggleComment(post)}
             >
              View all comments
            </p>
          </div>
          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input
              type="text"
            placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}/>
           <button
              className="comment"
              onClick={() => makeComment(comment, post._id)}>
             Post
            </button>
            <span
              className="material-symbols-outlined"
              onClick={() => handleShareFile(post)}>
              share
            </span>
             </div>
            </div>
      ))}
      {show && <div className="showComment"></div>}
    </div>
  );
}
