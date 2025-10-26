import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // загрузка из localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // сохранение в localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!text.trim()) return;
    const newTask = { id: Date.now(), text, done: false };
    setTasks([...tasks, newTask]);
    setText("");
  }

  function toggleDone(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <Card className="w-[400px] p-6 space-y-5 shadow-lg">
        <h2 className="text-2xl font-bold text-center">🧠 Мой To-Do List</h2>

        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите задачу..."
          />
          <Button onClick={addTask}>+</Button>
        </div>

        <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
          {tasks.length === 0 && (
            <p className="text-center text-muted-foreground">
              Пока нет задач 🙂
            </p>
          )}

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border rounded-md p-2"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={task.done}
                  onCheckedChange={() => toggleDone(task.id)}
                />
                <span
                  className={`${
                    task.done ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTask(task.id)}
              >
                ✕
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
