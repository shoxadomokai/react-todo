import { Component } from "react";
import "./index.scss";
import * as Icon from "react-feather";

export default class AppHeader extends Component {
  render() {
    return (
      <div className="App-header">
        <div className="header-search">
          <input type="search" placeholder="Search anything..." />
          <Icon.Search />
        </div>

        <ul className="header-actions">
          <li className="header-action">
            <Icon.Bell />
            <div className="badge">2</div>
          </li>
          <li className="header-action ">
            <div className="header-avatar">
              <img
                src="https://avatars.dicebear.com/api/adventurer/to-do.svg"
                alt="User Avatar"
              />
            </div>
            <Icon.ChevronDown />
          </li>
        </ul>
      </div>
    );
  }
}
