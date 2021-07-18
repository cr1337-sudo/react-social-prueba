import "./rightbar.css";
import { Users } from "../../Data";
import Online from "../online/Online";

export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img
            src="/assets/gift.png"
            alt=""
            srcset=""
            className="birthdayImg"
          />
          <span className="birthdayText">
            Pola foster and 3 other friends have a birthday today
          </span>
        </div>
        <img src="/assets/ad.png" alt="" srcset="" className="rightbarAd" />
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
