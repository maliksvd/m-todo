// app components
import { Todo } from './List'

// framer-motion
import { motion } from 'framer-motion'

// shadcn-ui
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { TrashIcon } from '@radix-ui/react-icons'

// types
interface TodoItemProps {
  todo: Todo
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
  return (
    <motion.div
      animate={{
        opacity: todo.completed ? 0.5 : 1,
        scale: todo.completed ? 0.95 : 1,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <Card className={`flex items-center justify-between mb-4 p-4 ${todo.completed ? 'opacity-50' : ''}`}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id={todo.id.toString()} checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
            <span className={`${todo.completed ? 'line-through' : ''} flex-1 text-xs font-mono`}>{todo.text}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {todo.category}
          </Badge>
        </div>

        <div>
          <Button variant="outline" size="sm" onClick={() => deleteTodo(todo.id)}>
            <TrashIcon className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
