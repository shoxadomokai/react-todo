import { Component } from "react";
import "./index.scss";
import logo from "assets/logo.png";
import * as Icon from "react-feather";

export default class AppNavbar extends Component {
  render() {
    return (
      <div className="App-nav">
        <div className="app-logo">
          <img src={logo} alt="React Logo" />
          <p>TO-DO</p>
        </div>

        <ul className="nav-list">
          <li className="nav-item active">
            <Icon.Grid />
          </li>
          <li className="nav-item">
            <Icon.BookOpen />
          </li>
          <li className="nav-item">
            <Icon.Settings />
          </li>
          <li className="nav-item">
            <Icon.Send />
          </li>
          <li className="nav-item">
            <Icon.FolderPlus />
          </li>
        </ul>
      </div>
    );
  }
}
