import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import API from "../api";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");

    const token = localStorage.getItem("token");
    const navigate = useNavigate(); // ✅ For redirect

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("👋 Logged out successfully!");
        navigate("/login"); // redirect to login page
    };

    // ✅ Fetch all tasks
    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // ✅ Add new task
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) return;

        try {
            const res = await API.post(
                "/tasks",
                {
                    title,
                    description,
                    status: "Pending",
                    dueDate: new Date().toISOString(),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setTasks((prev) => [res.data, ...prev]);
            setTitle("");
            setDescription("");
            alert("✅ Task added successfully!");
        } catch (err) {
            console.error("Error adding task:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Failed to add task");
        }
    };

    // ✅ Delete task
    const handleDelete = async (id) => {
        try {
            await API.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("✅ Task deleted successfully!");
            setTasks((prev) => prev.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error.response?.data || error.message);
        }
    };

    // ✅ Update task status
    const handleUpdate = async (task) => {
        try {
            const updatedStatus = task.status === "Pending" ? "Completed" : "Pending";
            const res = await API.put(
                `/tasks/${task._id}`,
                { status: updatedStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("✅ Task updated successfully!");
            setTasks((prev) =>
                prev.map((t) => (t._id === task._id ? res.data : t))
            );
        } catch (error) {
            console.error("Error updating task:", error.response?.data || error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-gray-50 p-6 rounded-lg shadow relative">
            {/* ✅ Logout Button */}
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
                Logout
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Task Dashboard</h2>

            {/* Add Task Form */}
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Add Task
                </button>
            </form>

            {/* Task List */}
            <div>
                {tasks.length === 0 ? (
                    <p className="text-gray-500 text-center">No tasks yet</p>
                ) : (
                    tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))
                )}
            </div>
        </div>
    );
}


