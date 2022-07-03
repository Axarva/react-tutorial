import Task from "./Task.js";

const Tasks = ({ tasks, toggleReminder, removeTask }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          text={task.text}
          day={task.day}
          reminder={task.reminder}
          id={task.id}
          onDoubleClick={() => toggleReminder(task.id)}
          remover={removeTask}
        />
      ))}
    </>
  );
};

export default Tasks;
