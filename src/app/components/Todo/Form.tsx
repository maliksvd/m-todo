'use client'

// zod & react-hook-form
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

// shadcn-ui
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

// icons
import { RocketIcon } from '@radix-ui/react-icons'

// types
interface TodoFormProps {
  addTodo: (text: string, category: string) => void
}

// zod schema
const formSchema = z.object({
  text: z.string().min(1, 'Please enter a todo'),
  category: z.enum(['personal', 'work', 'shopping']),
})

// form values
type FormValues = z.infer<typeof formSchema>

export default function TodoForm({ addTodo }: TodoFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      category: 'personal',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log('Submitting form with values:', values)
    try {
      addTodo(values.text, values.category)
      toast({
        title: 'Todo added successfully',
      })
    } catch (error) {
      console.error('Error adding todo:', error)
      toast({
        title: 'Error adding todo',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="p-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <Input {...field} placeholder="add a new todo" className="w-full border p-2 mr-2" />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4 w-full">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal">personal</SelectItem>
                      <SelectItem value="work">work</SelectItem>
                      <SelectItem value="shopping">shopping</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline" className="w-1/2 font-mono">
              <RocketIcon className="h-4 w-4 mr-2" />
              add
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
