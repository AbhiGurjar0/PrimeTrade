import { useEffect, useState } from "react";
import { api } from "../apis/api";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Check, 
  ClipboardList,
  Sparkles,
  Inbox,
  LogOut
} from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const loadTasks = async () => {
    const res = await api.getTasks();
    const data = await res.json();
    setTasks(data);
  };

  const createTask = async () => {
    if (!title.trim()) return;
    setIsCreating(true);
    await api.createTask({ title });
    setTitle("");
    await loadTasks();
    setIsCreating(false);
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

  const handleLogout = async () => {
    await api.logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-200">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-xs text-gray-500">Organize your tasks efficiently</p>
              </div>
            </div>
            
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 
                       bg-white/50 hover:bg-white rounded-lg transition-all duration-200 
                       border border-gray-200 hover:border-indigo-200 group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 py-8">
        
        {/* Create Task Card */}
        <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-indigo-100/50 p-6 mb-6 border border-white/50 hover:shadow-2xl transition-all duration-300">
          {/* Decorative gradient line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-t-2xl"></div>
          
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-800">Create New Task</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createTask()}
                placeholder="What needs to be done?"
                className="w-full px-5 py-3 bg-white/70 border border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                         focus:outline-none transition-all duration-200 
                         placeholder:text-gray-400 text-gray-700"
              />
              {title && (
                <button
                  onClick={() => setTitle("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <button
              onClick={createTask}
              disabled={isCreating || !title.trim()}
              className={`
                inline-flex items-center justify-center gap-2 px-6 py-3 
                bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium 
                rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl 
                hover:from-indigo-700 hover:to-purple-700 
                transition-all duration-200 disabled:opacity-50 
                disabled:cursor-not-allowed disabled:hover:from-indigo-600 
                disabled:hover:to-purple-600 min-w-[120px]
              `}
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Create</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Task List Card */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-indigo-100/50 p-6 border border-white/50">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-800">Your Tasks</h2>
            </div>
            {tasks.length > 0 && (
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
              </span>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="p-4 bg-indigo-50 rounded-full mb-4">
                <Inbox className="w-8 h-8 text-indigo-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium mb-2">No tasks yet</p>
              <p className="text-gray-400 text-sm text-center max-w-sm">
                Get started by creating your first task above. Your tasks will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks?.map((task, index) => (
                <div
                  key={task._id}
                  className="group relative bg-white rounded-xl border border-gray-100 
                           hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 
                           transition-all duration-200 animate-slideIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {editId === task._id ? (
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && updateTask(task._id)}
                          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg 
                                   focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                                   focus:outline-none transition-all duration-200"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateTask(task._id)}
                            className="flex items-center justify-center gap-1 px-4 py-2.5 
                                     bg-gradient-to-r from-green-500 to-emerald-600 
                                     text-white rounded-lg hover:from-green-600 
                                     hover:to-emerald-700 transition-all duration-200 
                                     shadow-sm shadow-green-200 min-w-[80px]"
                          >
                            <Check className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center justify-center gap-1 px-4 py-2.5 
                                     bg-gray-100 text-gray-600 rounded-lg 
                                     hover:bg-gray-200 transition-all duration-200 
                                     min-w-[80px]"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full group-hover:scale-150 transition-transform duration-200"></div>
                        <span className="text-gray-700 font-medium break-all">
                          {task.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => startEdit(task)}
                          className="p-2 text-gray-500 hover:text-indigo-600 
                                   hover:bg-indigo-50 rounded-lg transition-all duration-200"
                          title="Edit task"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="p-2 text-gray-500 hover:text-red-600 
                                   hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete task"
                        >
                          <Trash2 className="w-4 h-4" />
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

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}