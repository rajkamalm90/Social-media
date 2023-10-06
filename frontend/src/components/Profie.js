import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import ProfilePic from "./ProfilePic";

export default function Profie() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("")
  const [changePic, setChangePic] = useState(false)


  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false)
    } else {
      setChangePic(true)
    }
  }


  useEffect(() => {
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setPic(result.post);
        setUser(result.user)
        console.log(pic);
      });
  }, [pic]);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        
      <div className="profile-pic">
       <img
      onClick={changeprofile}
         src={user && user.Photo ? user.Photo : picLink}
          alt=""
           />
       </div>

        {/* profile-data */}
        <div className="pofile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic ? pic.length : "0"} posts</p>
            
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",

          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      {/* Gallery */}
      <div className="gallery">
        {pic.map((pics) => {
          return <img key={pics._id} src={pics.photo}  alt=""
            onClick={() => {
              toggleDetails(pics)
            }}
            className="item"></img>;
        })}
      </div>
      {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      }
      {
        changePic &&
        <ProfilePic changeprofile={changeprofile} />
      }
    </div>
  );
}
