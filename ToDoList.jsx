// React ve useState fonksiyonunu 'react' modülünden içe aktarıyoruz.
import React, { useState } from 'react';

// TodoApp adlı bir React bileşeni oluşturuyoruz.
function TodoApp() {
  // useState hook'u ile iki state değişkeni tanımlıyoruz
  // - todos: To-Do öğelerini tutacak bir dizi.
  // - task: Kullanıcının yeni görev eklemesi için kullanılacak olan alan.
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // Kullanıcının metin alanındaki değeri değiştirmesini takip eder.
  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  // Yeni bir görev eklemek için kullanılır.
  const handleAddTask = () => {
    if (task.trim() !== '') {
      // Eğer metin alanı boş değilse, todos dizisine yeni bir görev ekliyoruz.
      // Bu yeni görev, metin alanından alınan değeri ve başlangıçta tamamlanmamış olarak içerir.
      setTodos([...todos, { text: task, completed: false }]);
      // Metin alanını temizliyoruz.
      setTask('');
    }
  };

  // Bir görevin tamamlanmış durumunu değiştirmek için kullanılır.
  const handleToggleTask = (index) => {
    const updatedTodos = [...todos];
    // Belirtilen dizindeki görevin tamamlanmış durumunu tersine çeviriyoruz.
    updatedTodos[index].completed = !updatedTodos[index].completed;
    // Güncellenmiş görevleri state içinde saklıyoruz.
    setTodos(updatedTodos);
  };

  // Bir görevi silmek için kullanılır.
  const handleDeleteTask = (index) => {
    // Belirtilen dizindeki görevi filtreleyerek kaldırıyoruz.
    const updatedTodos = todos.filter((_, i) => i !== index);
    // Güncellenmiş görevleri state içinde saklıyoruz.
    setTodos(updatedTodos);
  };

  // Son olarak, JSX kullanarak arayüzü oluşturuyoruz.
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={handleTaskChange}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTask(index)}
            />
            {/* Tamamlanmış görevlerin üzerini çizik göstermek için stil ekliyoruz. */}
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// TodoApp bileşenini dışa aktarıyoruz.
export default TodoApp;
