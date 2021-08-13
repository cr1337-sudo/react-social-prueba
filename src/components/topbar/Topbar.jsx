import "./topbar.css";
import { Chat, Person, Search, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div class="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
        <span className="logo">Social-Web</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input type="text" placeholder="Search" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <span className="topbarLinks">
          <div className="topbarLink">Homepage</div>
          <div className="topbarLink">Timeline</div>
        </span>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            {" "}
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            {" "}
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            {" "}
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  );
}
