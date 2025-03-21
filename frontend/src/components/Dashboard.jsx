import { useState } from "react";
import { FaPlus, FaTasks, FaCalendarAlt, FaCog } from "react-icons/fa";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish project", due: "Feb 20", status: "To Do" },
    { id: 2, title: "Code review", due: "Feb 18", status: "In Progress" },
    { id: 3, title: "Deploy app", due: "Feb 25", status: "Done" },
  ]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Task Manager</h2>
        <nav className="space-y-4">
          <button className="flex items-center space-x-2">
            <FaTasks /> <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2">
            <FaCalendarAlt /> <span>Calendar</span>
          </button>
          <button className="flex items-center space-x-2">
            <FaCog /> <span>Settings</span>
          </button>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <FaPlus className="mr-2" /> Add Task
          </button>
        </header>
        
        {/* Task Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['To Do', 'In Progress', 'Done'].map((status) => (
            <div key={status} className="p-4 bg-gray-100 rounded shadow">
              <h3 className="text-lg font-semibold">{status}</h3>
              <p>{tasks.filter(task => task.status === status).length} Tasks</p>
            </div>
          ))}
        </div>
        
        {/* Task List */}
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Task</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-t">
                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.due}</td>
                <td className="p-3">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
