// import { useState } from "react";
import "./index.scss";
import * as Icon from "react-feather";
import { DashboardCard } from "components";
import { TaskList, TaskHistory } from "fragments";

import { Stack } from "@mui/material";

export function AppMain() {
  // const tasks = useAppSelector(selectTasks);
  // const messages = useAppSelector(selectMessages);
  // const dispatch = useAppDispatch();

  return (
    <div className="App-main">
      <Stack spacing={4}>
        <div className="section overview">
          <DashboardCard
            title="Task Completed"
            count={8}
            color="#4BA8A8"
            increase={10}
            icon={() => <Icon.Star />}
          />
          <DashboardCard
            title="New Task"
            count={10}
            color="#F8B400"
            increase={10}
            icon={() => <Icon.FileText />}
          />
          <DashboardCard
            title="Project Done"
            count={10}
            color="#FF614C"
            increase={8}
            icon={() => <Icon.Clipboard />}
          />
        </div>

        <TaskHistory />

        <TaskList />
      </Stack>
    </div>
  );
}
