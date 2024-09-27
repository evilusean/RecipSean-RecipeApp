'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchProps {
  onSearch: (query: string, type: string, nationality: string) => void
}

export function SearchComponent({ onSearch }: SearchProps) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [nationality, setNationality] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query, type, nationality)
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
      <div className="flex space-x-2">
        <Select onValueChange={(value: string) => setType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Recipe Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="simple">Simple</SelectItem>
            <SelectItem value="slowcooker">Slow Cooker</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value: string) => setNationality(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nationality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="japanese">Japanese</SelectItem>
            <SelectItem value="italian">Italian</SelectItem>
            <SelectItem value="slovak">Slovak</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  )
}