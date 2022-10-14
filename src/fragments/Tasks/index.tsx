import {
  FormControl,
  Select,
  MenuItem,
  Radio,
  ListItemText,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  SxProps,
  Theme,
  LinearProgress,
  Stack,
  linearProgressClasses,
  styled
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useAppSelector } from "store/hooks";
import { selectTasks } from "store/modules/tasks";
import "./index.scss";
import * as Icon from "react-feather";

const timeframes: Record<string, moment.Moment> = {
  "Last day": moment().subtract(1, "day"),
  "Last 7 days": moment().subtract(1, "week"),
  "Last 30 days": moment().subtract(1, "month"),
  "Last Quarter": moment().subtract(1, "quarter"),
  "Last Year": moment().subtract(1, "year")
} as const;

type ITimeframes = keyof typeof timeframes;

const tableHeadStyle: SxProps<Theme> = {
  color: "#768396",
  fontSize: "15px"
};

const tableBodyStyle: SxProps<Theme> = {
  color: "#000",
  fontSize: "15px",
  fontWeight: "500"
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#E3E8EE"
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#4BA8A8"
  }
}));

export function TaskList() {
  const tasks = useAppSelector(selectTasks);
  const [timeframe, setTimeframe] = useState<ITimeframes>("Last Year");

  const filtered_tasks = tasks.filter(task => {
    return moment(task.startDate).isAfter(timeframes[timeframe]);
  });

  return (
    <article className="task-section card">
      <div className="section-header">
        <h3 className="section-title">Task</h3>

        <FormControl>
          <Select
            value={timeframe}
            onChange={value => setTimeframe(value.target.value as ITimeframes)}
            displayEmpty
            inputProps={{
              "aria-label": "Without label"
            }}
            renderValue={selected => selected}
            size="small"
            sx={{
              borderRadius: "8px",
              fontSize: "13px",
              backgroundColor: "#E8EDF1",
              borderColor: "#72B9BA"
            }}
            MenuProps={{
              hideBackdrop: true,
              sx: {
                padding: "2px"
              },
              MenuListProps: {
                sx: {
                  border: "1px solid #C8CCD7",
                  borderRadius: "8px",
                  "& span": {
                    fontSize: "12px"
                  }
                }
              }
            }}
          >
            {Object.keys(timeframes).map(tf => (
              <MenuItem key={tf} value={tf} sx={{ fontSize: "13px" }}>
                <Radio checked={tf === timeframe} />
                <ListItemText primary={tf} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {filtered_tasks.length ? (
        <Table
          sx={{
            marginTop: 3,
            marginBottom: 5
          }}
          aria-label="uncompleted tasks"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeadStyle}> Name of Task </TableCell>
              <TableCell sx={tableHeadStyle}>Start Date</TableCell>
              <TableCell sx={tableHeadStyle}>End Date</TableCell>
              <TableCell sx={tableHeadStyle}>Hours</TableCell>
              <TableCell sx={tableHeadStyle}>Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered_tasks.map(task => {
              const progress = Math.random() * 100;
              return (
                <TableRow key={task.title}>
                  <TableCell sx={tableBodyStyle}>{task.title}</TableCell>
                  <TableCell sx={tableBodyStyle}>
                    {moment(task.startDate).format("MMM D, YYYY")}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    {moment(task.endDate).format("MMM D, YYYY")}
                  </TableCell>
                  <TableCell sx={tableBodyStyle}>
                    {task.hoursBudgeted}
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <p style={{ color: "#4BA8A8", fontWeight: "500" }}>
                        {Math.ceil(progress)}% complete
                      </p>
                      <BorderLinearProgress
                        variant="determinate"
                        value={progress}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            marginTop: 10,
            marginBottom: 10,
            textAlign: "center",
            marginLeft: "auto",
            opacity: 0.3
          }}
          spacing={3}
        >
          <Icon.AlertOctagon size={60} />
          <h3>Nothing to see here</h3>
        </Stack>
      )}
    </article>
  );
}
