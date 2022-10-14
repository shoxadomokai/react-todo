import { useState } from "react";
import "./index.scss";
import * as Icon from "react-feather";
import { MessageTile } from "components";
import { CreateTask } from "fragments";

import { Stack } from "@mui/material";
import { useAppSelector } from "store/hooks";
import { selectMessages } from "store/modules/messages";
// import { selectTasks } from "store/modules/tasks";

interface IState {
  type: "grid" | "calendar";
}

export function AppSidebar() {
  // const tasks = useAppSelector(selectTasks);
  const messages = useAppSelector(selectMessages);
  // const dispatch = useAppDispatch();
  const [type, setType] = useState<IState["type"]>("grid");

  return (
    <div className="App-sidebar">
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">Today's Schedule</h3>

          <div className="button-group">
            <button
              className={type === "grid" ? "active" : ""}
              onClick={() => setType("grid")}
            >
              <Icon.Grid size={14} />
            </button>
            <button
              className={type === "calendar" ? "active" : ""}
              onClick={() => setType("calendar")}
            >
              <Icon.Calendar size={14} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ minHeight: "30px" }}></div>

      <div className="section">
        <div className="section-header">
          <h3 className="section-title">New Task</h3>

          <Icon.MoreHorizontal />
        </div>

        <CreateTask />
      </div>

      <div style={{ minHeight: "30px" }}></div>

      <div className="section">
        <div className="section-header">
          <h3 className="section-title">Messages</h3>
        </div>
        <div style={{ minHeight: "30px" }}></div>
        <Stack spacing={5}>
          {messages.map(message => (
            <MessageTile key={message.id} {...message} />
          ))}
        </Stack>
      </div>
    </div>
  );
}
