import "./rightbar.css";
import { Users } from "../../Data";
import { Add, Remove } from "@material-ui/icons";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user:currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?.id));
  }, [user, currentUser]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (e) {
      }
    };
    getFriends();
  }, [currentUser, user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };
  return (
    <div className="rightbar">
      {user !== currentUser.username && (
        <button onClick={handleClick} className="rightbarFollowButton">
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            Pola foster and 3 other friends have a birthday today
          </span>
        </div>
        <img src="/assets/ad.png" alt="" srcset="" className="rightbarAd" />
        <div className="rightBarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username}>
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture ? PF + friend.profilePicture : null
                  }
                  alt=""
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        <h4 className="rightbarTitle">Online friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online user={u} key={u.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
