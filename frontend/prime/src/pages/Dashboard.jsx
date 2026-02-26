import { useEffect, useState } from "react";
import { api } from "../apis/api";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const loadTasks = async () => {

    const res = await api.getTasks();
    const data = await res.json();

    setTasks(data);

  };

  const createTask = async () => {

    if (!title.trim()) return;

    await api.createTask({ title });

    setTitle("");

    loadTasks();

  };

  const deleteTask = async (id) => {

    await api.deleteTask(id);

    loadTasks();

  };

  const startEdit = (task) => {

    setEditId(task._id);
    setEditTitle(task.title);

  };

  const cancelEdit = () => {

    setEditId(null);
    setEditTitle("");

  };

  const updateTask = async (id) => {

    if (!editTitle.trim()) return;

    await api.updateTask(id, { title: editTitle });

    setEditId(null);
    setEditTitle("");

    loadTasks();

  };

  useEffect(() => {
    loadTasks();
  }, []);


  return (

    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white shadow-sm border-b">

        <div className="max-w-4xl mx-auto px-6 py-4">

          <h2 className="text-2xl font-bold text-gray-800">
            Task Dashboard
          </h2>

        </div>

      </header>


      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">


        {/* Create Task */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h3 className="text-lg font-semibold mb-4">
            Create New Task
          </h3>

          <div className="flex gap-3">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            <button
              onClick={createTask}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Create
            </button>

          </div>

        </div>


        {/* Task List */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h3 className="text-lg font-semibold mb-4">
            Your Tasks
          </h3>


          {tasks.length === 0 ? (

            <div className="text-gray-400 text-center py-6">
              No tasks found
            </div>

          ) : (

            <div className="space-y-3">

              {tasks.map(task => (

                <div
                  key={task._id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >

                  {editId === task._id ? (

                    <div className="flex gap-2">

                      <input
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(e.target.value)
                        }
                        className="flex-1 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />

                      <button
                        onClick={() => updateTask(task._id)}
                        className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-4 py-1 rounded-lg hover:bg-gray-500"
                      >
                        Cancel
                      </button>

                    </div>

                  ) : (

                    <div className="flex justify-between items-center">

                      <span className="font-medium text-gray-800">
                        {task.title}
                      </span>

                      <div className="flex gap-2">

                        <button
                          onClick={() => startEdit(task)}
                          className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteTask(task._id)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}