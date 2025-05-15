"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";


type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  //  Add a todo to Supabase and local state
  const addTodo = async () => {
    if (!todo.trim()) return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: todo }])
      .select();

    if (error) {
      console.error("Failed to add todo:", error.message);
      return;
    }

    if (data) {
      setTodos((prev) => [...prev, ...data]); // Add full todo (id + title)
      setTodo(""); // Clear input
    }
  };

  //  Fetch todos on page load
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch todos:", error.message);
      } else {
        setTodos(data);
      }
    };

    fetchTodos();
  }, []);
  //delete todo
  const deleteTodo = async (idToDelete: string) => {


    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", idToDelete);

    if (error) {
      console.error("Failed to delete todo:", error.message);
      return;
    }

    setTodos((prev) => prev.filter((todo) => todo.id !== idToDelete));
  };
  //edit todo
  const saveEdit = async (id: string) => {
    const { error } = await supabase
      .from("todos")
      .update({ title: editText })
      .eq("id", id);

    if (error) {
      console.error("Failed to update todo:", error.message);
      return;
    }

    // Update UI
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: editText } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  //add todo toggler
  const toggleComplete = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !currentStatus })
      .eq("id", id);

    if (error) {
      console.error("Failed to update completion:", error.message);
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !currentStatus } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-pink-600 mb-6 font-serif">
          Nany's Todo App
        </h1>

        {/* Input + Button */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter A task"
            className="flex-grow px-4 py-2 rounded-full shadow-inner border focus:outline-none focus:ring-2 focus:ring-pink-400 font-serif"
          />
          <button
            onClick={addTodo}
            className="bg-pink-400 hover:bg-pink-500 text-white font-serif font-semibold rounded-full px-6 py-2 shadow-md"
          >
            Add Todos
          </button>
        </div>

        {/* Todo List */}
        <h2 className="text-2xl font-bold text-pink-500 mb-4 mt-2 font-serif">Your Todos</h2>
        <ul className="space-y-4">
          {todos.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center text-2xl bg-pink-300 text-black px-4 py-3 rounded-2xl"
            >
              <div className="flex justify-between gap-2 w-full items-center">
                <div className="flex gap-2 items-center text-left">
                  {/* ✅ Checkbox */}
                  <input
                    type="checkbox"
                    checked={item.completed ?? false}
                    onChange={() => toggleComplete(item.id, item.completed)}
                    className="w-5 h-5 accent-pink-500"
                  />


                  {/* Title or input */}
                  {editingId === item.id ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-grow bg-white text-black font-serif py-1 px-2 rounded capitalize"
                    />
                  ) : (
                    <span
                      className={`text-md  font-serif capitalize ${item.completed ? "line-through text-gray-400" : ""
                        }`}
                    >
                      {item.title}
                    </span>
                  )}
                </div>
                {/* Buttons (edit/save/delete) stay the same */}
                <div className="flex gap-2">
                  {editingId === item.id ? (
                    <button
                      onClick={() => saveEdit(item.id)}
                      className="text-sm font-bold text-white"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setEditText(item.title);
                        }}
                        className="text-sm font-bold hover:text-pink-700 text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTodo(item.id)}
                        className="text-sm font-bold text-white hover:text-pink-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>

          ))}

        </ul>
      </div>
    </div>
  );
}
