'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchProps {
  onSearch: (query: string) => void
}

export function SearchComponent({ onSearch }: SearchProps) {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full max-w-sm sm:max-w-md mx-auto items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <Input
        type="text"
        placeholder="Search recipes, ingredients, or types..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-tokyo-bg text-tokyo-fg border-tokyo-blue focus:border-tokyo-cyan"
      />
      <Button type="submit" className="w-full sm:w-auto bg-tokyo-blue hover:bg-tokyo-cyan text-tokyo-bg">
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  )
}