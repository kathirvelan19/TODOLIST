import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Add new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: newTodoText.trim(),
      completed: false
    };

    setTodos([newTodo, ...todos]);
    setNewTodoText('');
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Calculate stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="title">
            <span className="icon">📋</span>
            TodoApp
          </h1>
          <p className="subtitle">Stay motivated and accomplish your goals, one task at a time</p>
        </div>
      </header>

      <main className="main">
        <div className="container">

          {/* Progress Card */}
          <div className="progress-card">
            <div className="progress-header">
              <h2>Today's Progress</h2>
              
              <div className="date">
                <span className="icon">📆</span>
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-info">
                <span>Completed</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-number">{totalTodos}</div>
                <div className="stat-label">Total Tasks</div>
              </div>
              <div className="stat-card completed">
                <div className="stat-number">{completedTodos}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card active">
                <div className="stat-number">{activeTodos}</div>
                <div className="stat-label">Remaining</div>
              </div>
            </div>
          </div>

          {/* Add Todo Form */}
          <div className="add-todo-card">
            <form onSubmit={addTodo} className="add-todo-form">
              <input
                type="text"
                placeholder="What do you want to accomplish today?"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                className="todo-input"
              />
              <button type="submit" className="add-btn" disabled={!newTodoText.trim()}>
                <span className="plus-icon">+</span>
                Add Task
              </button>
            </form>
          </div>

          {/* Filters */}
          <div className="filters-card">
            <div className="filters">
              <button
                onClick={() => setFilter('all')}
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              >
                Active Tasks
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              >
                Completed Tasks
              </button>
              <button
                onClick={clearCompleted}
                className="clear-btn"
                disabled={completedTodos === 0}
              >
                Clear Completed
              </button>
            </div>
          </div>

          {/* Todo List */}
          <div className="todos-card">
            <div className="todos-header">
              <h3>Your Tasks</h3>
            </div>

            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>
                  {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
                </h3>
                <p>
                  {filter === 'all'
                    ? 'Add your first task above to get started on your productive journey!'
                    : `You don't have any ${filter} tasks at the moment.`}
                </p>
              </div>
            ) : (
              <div className="todos-list">
                {filteredTodos.map((todo) => (
                  <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <div className="todo-content">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="todo-checkbox"
                      />
                      <span className="todo-text">{todo.text}</span>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="delete-btn"
                      title="Delete task"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
