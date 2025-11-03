export default function TaskItem({ task, onDelete, onUpdate }) {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow mb-2">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs text-gray-500">
          Status:{" "}
          <span
            className={
              task.status === "Completed" ? "text-green-600" : "text-yellow-600"
            }
          >
            {task.status}
          </span>{" "}
          | {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        <button
          onClick={() => onUpdate(task)}
          className="px-3 py-1 bg-yellow-400 text-white rounded mr-2 hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
