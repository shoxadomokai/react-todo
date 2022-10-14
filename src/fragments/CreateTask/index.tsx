import { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAppSelector, useAppDispatch } from "store/hooks";
import {
  add,
  ICollaborator,
  ITask,
  selectCollaborators
} from "store/modules/tasks";
import { Autocomplete, Stack } from "@mui/material";
import { TextField } from "components";
import "./index.scss";
import * as Icon from "react-feather";
import moment from "moment";

const emojis: string[] = "🥳,😍,😁,🔥,😘,😉,😎,👧🏽,🙄".split(",");

export function CreateTask() {
  const allCollaborators = useAppSelector(selectCollaborators);
  const dispatch = useAppDispatch();

  const [task, setTask] = useState<ITask>({
    title: "",
    collaborators: allCollaborators.slice(0, 2),
    startDate: "",
    endDate: "",
    hoursBudgeted: ""
  });

  const [showCollaborators, setShowCollaborators] = useState<boolean>(false);

  const handleChange = (value: string, field: keyof typeof task) => {
    setTask(task => ({
      ...task,
      [field]: value
    }));
  };

  const addEmoji = (emoji: string) => {
    setTask(task => ({
      ...task,
      title: task.title.trim() + " " + emoji
    }));
  };

  const addCollaborator = (collaborator: ICollaborator) => {
    setTask(task => ({
      ...task,
      collaborators: [collaborator].concat(task.collaborators)
    }));
  };

  const removeCollaborator = (collaborator: ICollaborator) => {
    setTask(task => ({
      ...task,
      collaborators: task.collaborators.filter(
        c => c.name !== collaborator.name
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(add(task));

    // Clear Form
    setTask(() => ({
      title: "",
      collaborators: [],
      startDate: "",
      endDate: "",
      hoursBudgeted: ""
    }));
    (e.target as HTMLFormElement).reset();
  };

  const canSubmit = !Object.values(task).some(value => !value);

  const available_collaborators = allCollaborators.filter(
    co => !task.collaborators.includes(co)
  );

  const generateColors = () =>
    Array.from({ length: 10 }, (v, i) => {
      const hue = Math.floor(Math.random() * 360);
      const pastel = `${hue}, 100%`;
      return pastel;
    });

  const [colors] = useState(generateColors());

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <form className="create-task" onSubmit={handleSubmit}>
        <div className="input_section title">
          <h3 className="input_section__title">Task Title</h3>

          <TextField
            placeholder="Create new"
            value={task.title}
            onChange={e => handleChange(e.target.value, "title")}
          />
          {/* <input type="text" name="" id="" value={task.title} /> */}

          <div className="input_section__emojis">
            <Icon.ChevronLeft />
            <ul className="emoji-list">
              {emojis.map(emoji => {
                return (
                  <li key={emoji} className="emoji-item">
                    <button
                      type="button"
                      className="emoji-button"
                      onClick={() => addEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  </li>
                );
              })}
            </ul>
            <Icon.ChevronRight />
          </div>
        </div>

        <div className="input_section collaborators">
          <h3 className="input_section__title">Add Collaborators</h3>

          <div className="input_section__collaborators">
            <ul className="input_section__collaborator-list">
              {task.collaborators.map((collaborator, index) => {
                return (
                  <li
                    className="input_section__collaborator-item"
                    key={collaborator.name}
                    style={
                      {
                        "--base-color-hs": colors[index]
                      } as React.CSSProperties
                    }
                    onClick={() => removeCollaborator(collaborator)}
                  >
                    <img src={collaborator.avatar} alt={collaborator.name} />
                    <p>{collaborator.name}</p>
                    <Icon.X size={15} />
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              className="input_section__add-collaborator"
              onClick={() => setShowCollaborators(!showCollaborators)}
            >
              <Icon.Plus />
            </button>
            <button
              type="button"
              className="input_section__add-collaborator active"
            >
              <Icon.ChevronRight />
            </button>
          </div>

          {showCollaborators ? (
            <Autocomplete
              sx={{
                marginTop: "20px"
              }}
              disablePortal
              options={available_collaborators}
              getOptionLabel={option => option.name}
              clearOnBlur
              blurOnSelect
              onChange={(_event, newValue: ICollaborator | null) => {
                if (newValue) {
                  addCollaborator(newValue);
                }
              }}
              renderInput={params => (
                <TextField {...params} label="Search Collaborators" />
              )}
            />
          ) : null}
        </div>

        <div className="input_section timeframe">
          <h3 className="input_section__title">Time to Complete</h3>
          <Stack spacing={3}>
            <DatePicker
              label="Start Date"
              value={task.startDate}
              minDate={moment()}
              onChange={newValue => {
                if (newValue)
                  handleChange(newValue.format("DD/MMMM/YYYY"), "startDate");
                else {
                  handleChange("", "endDate");
                }
              }}
              renderInput={params => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={task.endDate}
              minDate={moment()}
              onChange={newValue => {
                if (newValue)
                  handleChange(newValue.format("DD/MMMM/YYYY"), "endDate");
                else {
                  handleChange("", "endDate");
                }
              }}
              renderInput={params => <TextField {...params} />}
            />
          </Stack>
        </div>

        <div className="input_section hours">
          <h3 className="input_section__title">Hours Budgeted</h3>
          <TextField
            value={task.hoursBudgeted}
            type="number"
            onChange={e => {
              const hours = Number(e.target.value);
              e.preventDefault();
              if (hours && hours >= 0) {
                handleChange(hours.toString(), "hoursBudgeted");
              } else {
                handleChange("0", "hoursBudgeted");
              }
            }}
            label="Enter Hours"
          />

          <button className="form-submit" type="submit" disabled={!canSubmit}>
            Save
          </button>
        </div>
      </form>
    </LocalizationProvider>
  );
}
