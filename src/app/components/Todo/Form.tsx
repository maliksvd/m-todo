'use client'

// react

// framer-motion

// zod & react-hook-form
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

// shadcn-ui
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// icons
import { RocketIcon } from '@radix-ui/react-icons'
// types
interface TodoFormProps {
  addTodo: (text: string, category: string) => void
}

// zod schema
const formSchema = z.object({
  text: z.string().min(1, 'Please enter a todo'),
  category: z.enum(['personal', 'work', 'travel', 'shopping']),
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
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger className="bottom-0 left-0 right-0 flex justify-center pb-4 z-50 overflow-hidden fixed">
        <Button>add todo</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a new todo</DrawerTitle>
          <DrawerDescription>You can add a new todo by entering a text and selecting a category.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      {...field}
                      placeholder="add a new todo"
                      className="w-full border p-2 mr-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          form.handleSubmit(onSubmit)()
                        }
                      }}
                    />{' '}
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
                          <SelectItem value="travel">travel</SelectItem>
                          <SelectItem value="shopping">shopping</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DrawerClose className="w-1/2 font-mono">
                  <Button type="submit" className="font-mono">
                    <RocketIcon className="h-4 w-4 mr-2" />
                    add
                  </Button>
                </DrawerClose>
              </div>
            </form>
          </Form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
