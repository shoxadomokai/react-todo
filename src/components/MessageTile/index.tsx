import { IMessageTile } from "store/modules/messages";
import "./index.scss";

export const MessageTile = (props: IMessageTile) => {
  return (
    <div className="message-tile">
      <div className="message-tile__avatar">
        <img src={props.avatar} alt="" />
      </div>
      <div className="message-tile__content">
        <h4 className="message-tile__title">{props.name}</h4>
        <p className="message-tile__subtitle">{props.message}</p>
      </div>
    </div>
  );
};
