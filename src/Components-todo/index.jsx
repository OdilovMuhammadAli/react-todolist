import { useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const Submit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newTodo = {
      title: form.get("title"),
      description: form.get("description"),
    };
    if (!newTodo.title.trim()) return;
    setTodos([...todos, newTodo]);
    e.target.reset();
  };

  const Edit = (i) => {
    setEditIndex(i);
    setEditData(todos[i]);
  };

  const EditSave = () => {
    const updated = [...todos];
    updated[editIndex] = editData;
    setTodos(updated);
    setEditIndex(null);
  };

  const Delete = (i) => {
    setDeleteIndex(i);
  };

  const DeleteConfirm = () => {
    const newArr = todos.filter((_, i) => i !== deleteIndex);
    setTodos(newArr);
    setDeleteIndex(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 py-12 px-4">
      <div className="max-w-xl mx-auto space-y-10">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg tracking-wide">
          Todo List APP
        </h1>

        <form
          onSubmit={Submit}
          className="bg-white/20 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-2xl space-y-4"
        >
          <input
            type="text"
            className="w-full p-3 bg-white/70 border-none outline-none rounded-lg focus:ring-4 focus:ring-purple-400 placeholder:text-gray-600"
            placeholder="Zadacha..."
            name="title"
          />

          <textarea
            placeholder="Izoh qoldiring..."
            className="resize-none w-full p-3 h-24 bg-white/70 border-none outline-none rounded-lg focus:ring-4 focus:ring-indigo-400"
            name="description"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold tracking-wide transition hover:bg-purple-700 hover:shadow-xl"
          >
            Qo'shish
          </button>
        </form>

        <ul className="space-y-4">
          {todos.map((todo, i) => (
            <li
              key={i}
              className="bg-white/40 backdrop-blur-lg shadow-xl border border-white/50 p-5 rounded-2xl flex justify-between items-start gap-4 transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-purple-400"
            >
              <div className="space-y-1">
                <h2 className="font-bold text-lg text-gray-900">
                  {todo.title}
                </h2>
                <p className="text-gray-800 text-sm">{todo.description}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => Edit(i)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Edi
                </button>

                <button
                  onClick={() => Delete(i)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Del
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* EDIT MODAL */}
        {editIndex !== null && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur flex justify-center items-center z-50">
            <div className="bg-white/90 rounded-2xl p-6 w-[340px] shadow-2xl border border-purple-200 space-y-4">
              <h2 className="text-xl font-bold text-purple-600">Tahrirlash</h2>

              <input
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />

              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="w-full p-2 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 outline-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditIndex(null)}
                  className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
                >
                  Bekor
                </button>
                <button
                  onClick={EditSave}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {deleteIndex !== null && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur flex justify-center items-center z-50">
            <div className="bg-white/90 rounded-2xl p-6 w-[300px] shadow-2xl border border-red-200 text-center space-y-6">
              <h2 className="text-xl font-bold text-red-600">
                Rostan o'chirasizmi?
              </h2>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setDeleteIndex(null)}
                  className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
                >
                  Yo'q
                </button>
                <button
                  onClick={DeleteConfirm}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Ha
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
// Ustoz gpt ishlatganman kopiga, chunmaganim uchun oshanga uzur sorayman
