import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleComplete,
  editTask,
  deleteTask,
  setSearchFilter,
  setFilterStatus,
} from "../redux/features/taskSlice";

const TaskList = () => {
  const { tasks, filter } = useSelector((state) => state.tasks);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const dispatch = useDispatch();

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditSave = (id) => {
    if (editText.trim()) {
      dispatch(editTask({ id, newText: editText.trim() }));
      setEditId(null);
      setEditText("");
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter.status === "completed") return task.completed;
      if (filter.status === "pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(filter.search.toLowerCase())
    );

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks"
        className="w-full p-4 border border-blue-500 mb-4 rounded-3xl"
        value={filter.search}
        onChange={(e) => dispatch(setSearchFilter(e.target.value))}
      />

      {/* Filter tasks */}
      <div className="flex gap-2 mb-4">
        {["all", "completed", "pending"].map((status) => (
          <button
            key={status}
            onClick={() => dispatch(setFilterStatus(status))}
            className={`px-5 py-2 rounded-2xl border border-blue-500 ${
              filter.status === status
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 && <p>No tasks found</p>}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="bg-gray-100 p-4 flex justify-between items-center rounded-3xl"
          >
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleComplete(task.id))}
                className="mr-2"
              />
              {editId === task.id ? (
                <input
                  type="text"
                  className="border rounded px-2"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.text}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {editId === task.id ? (
                <button
                  onClick={() => handleEditSave(task.id)}
                  className="text-gray-600 hover:underline cursor-pointer"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(task.id, task.text)}
                  className="text-gray-600 hover:underline cursor-pointer"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="text-red-400 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;