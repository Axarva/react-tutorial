import { FaTimes } from "react-icons/fa";

const Task = ({ text, day, reminder, onDoubleClick, remover, id }) => {
  var reminderClass = reminder ? "reminder" : "";

  return (
    <div className={`task ${reminderClass}`} onDoubleClick={onDoubleClick}>
      <h3>
        {text}
        <FaTimes style={{ color: "red" }} onClick={() => remover(id)} />
      </h3>
      <p>{day}</p>
    </div>
  );
};

export default Task;
