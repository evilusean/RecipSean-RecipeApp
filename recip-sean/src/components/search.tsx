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
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search recipes, ingredients, types, or 'favorite'"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit">
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  )
}