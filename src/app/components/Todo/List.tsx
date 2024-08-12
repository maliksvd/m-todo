'use client'

// react
import { useEffect, useState } from 'react'

// components
import Filters from './Filters'
import TodoForm from './Form'
import TodoItem from './Item'

// types
export interface Todo {
  id: number
  text: string
  completed: boolean
  category: string
}

export default function TodoList() {
  // states
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  // check if there are todos in localStorage
  // @if there are, set them to state
  // @if not, set isLoading to false
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
    setIsLoading(false)
  }, [])

  // save todos to localStorage
  // @if isLoading is false, save todos to localStorage
  // @if isLoading is true, do nothing
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, isLoading])

  // add todo to state
  // @if text and category are not empty, add todo to state
  const addTodo = (text: string, category: string) => {
    if (text.trim() && category.trim()) {
      const newTodos = [
        ...todos,
        {
          id: Date.now(),
          text: text.trim(),
          completed: false,
          category: category.trim(),
        },
      ]
      setTodos(newTodos)
    }
  }

  // toggle todo in state
  const toggleTodo = (id: number) => {
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    setTodos(newTodos)
  }

  // delete todo in state
  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  // filter todos based on filter state
  const filteredTodos = filter === 'all' ? todos : todos.filter((todo) => todo.category === filter)

  // sort todos based on completed state
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed === b.completed) return 0
    return a.completed ? 1 : -1
  })

  // get all categories from todos
  const categories = ['all', ...Array.from(new Set(todos.map((todo) => todo.category).filter(Boolean)))]

  // if isLoading is true, return loading message
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full max-w-xl">
      <h1 className="font-mono font-bold text-lg mb-4">m-todo</h1>
      <div className="flex flex-col w-full">
        <TodoForm addTodo={addTodo} />
        <div className="w-full mt-10">
          <Filters categories={categories} setFilter={setFilter} />
          <div className="min-h-[500px] overflow-y-auto">
            <ul>
              {sortedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
