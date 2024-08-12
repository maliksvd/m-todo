// react
import { useState } from 'react'

// shadcn-ui
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// types
interface FiltersProps {
  categories: string[]
  setFilter: (filter: string) => void
}

export default function Filters({ categories, setFilter }: FiltersProps) {
  // states
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

  // handle select change and set filter state to selected category
  const handleSelect = (category: string) => {
    setSelectedCategory(category)
    setFilter(category)
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <Select value={selectedCategory} onValueChange={handleSelect}>
          <SelectTrigger className="w-full py-4">
            <SelectValue placeholder="filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.filter(Boolean).map((category) => (
              <SelectItem key={category} value={category.toLowerCase()} className="lowercase">
                {category.toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
