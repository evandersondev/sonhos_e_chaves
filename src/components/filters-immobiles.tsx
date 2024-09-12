'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Separator } from './ui/separator'

const filtersSchema = z.object({
  search: z.string(),
  rooms: z.string(),
  bathrooms: z.string(),
  type: z.string(),
})

type FiltersSchemaType = z.infer<typeof filtersSchema>

type FiltersProps = {
  onHanldeSearch: () => Promise<void>
}

export function Filters({ onHanldeSearch }: FiltersProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, setValue } = useForm<FiltersSchemaType>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      search: searchParams.get('q') || '',
      rooms: searchParams.get('rooms') || '',
      bathrooms: searchParams.get('bathrooms') || '',
      type: searchParams.get('type') || '',
    },
  })

  const search = watch('search')
  const type = watch('type')
  const rooms = watch('rooms')
  const bathrooms = watch('bathrooms')

  function handleSetUrlParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  async function handleSearchSubmit(data: FiltersSchemaType) {
    setLoading(true)
    await onHanldeSearch()
    setLoading(false)
  }

  async function handleClearFilters() {
    setValue('search', '')
    setValue('rooms', '')
    setValue('bathrooms', '')
    setValue('type', '')

    window.location.replace('/immobiles')
  }

  return (
    <form onSubmit={handleSubmit(handleSearchSubmit)} className='flex flex-col lg:flex-row items-center gap-4 px-8 py-8 bg-white border border-zinc-200/50 rounded-xl'>
      <div className='flex w-full lg:min-w-40 flex-1 flex-col gap-2'>
        <Label htmlFor='search'>Buscar por</Label>
        <Input
          onChange={e => {
            setValue('search', e.target.value)
            handleSetUrlParams('q', e.target.value)
          }}
          className='w-full'
          placeholder='localidade, código, condominío'
          value={search}
          {...register('search')}
        />
      </div>

      <Separator
        orientation='vertical'
        className='h-20 bg-zinc-200/50 hidden lg:block'
      />

      <div className='flex flex-col gap-2 flex-1'>
        <Label htmlFor='room'>Quartos</Label>
        <Select
          value={rooms}
          defaultValue={rooms}
          {...register('rooms')}
          onValueChange={value => {
            setValue('rooms', value)
            handleSetUrlParams('rooms', value)
          }}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Quartos' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Quartos</SelectLabel>
              <SelectItem value='1'>1</SelectItem>
              <SelectItem value='2'>2</SelectItem>
              <SelectItem value='3'>3</SelectItem>
              <SelectItem value='+4'>+4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator
        orientation='vertical'
        className='h-20 bg-zinc-200/50 hidden lg:block'
      />

      <div className='flex flex-col gap-2 flex-1'>
        <Label htmlFor='room'>Banheiros</Label>
        <Select
          value={bathrooms}
          defaultValue={bathrooms}
          {...register('bathrooms')}
          onValueChange={value => {
            setValue('bathrooms', value)
            handleSetUrlParams('bathrooms', value)
          }}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Banheiros' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Banheiros</SelectLabel>
              <SelectItem value='1'>1</SelectItem>
              <SelectItem value='2'>2</SelectItem>
              <SelectItem value='3'>3</SelectItem>
              <SelectItem value='+4'>+4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator
        orientation='vertical'
        className='h-20 bg-zinc-200/50 hidden lg:block'
      />

      <div className='flex flex-col gap-2 flex-1'>
        <Label htmlFor='email'>Tipo</Label>
        <Select
          value={type}
          defaultValue={type}
          {...register('type')}
          onValueChange={value => {
            setValue('type', value)
            handleSetUrlParams('type', value)
          }}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Tipo' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo</SelectLabel>
              <SelectItem value='all'>Todos</SelectItem>
              <SelectItem value='house'>Casa</SelectItem>
              <SelectItem value='apartment'>Apartamento</SelectItem>
              <SelectItem value='condominium'>Condomínio</SelectItem>
              <SelectItem value='ground'>Terreno</SelectItem>
              <SelectItem value='commercial'>Comercial</SelectItem>
              <SelectItem value='residential'>Residencial</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator
        orientation='vertical'
        className='h-20 bg-zinc-200/50 hidden lg:block'
      />

      <div className='flex items-center w-fit gap-4 mt-5'>
        <Button
          type='submit'
          disabled={loading}
          className='self-center w-full md:w-fit'
        >
          {loading ? (
            <Loader2 className='size-4 mr-2 animate-spin' />
          ) : (
            <Search className='size-4 mr-2' />
          )}
          Buscar
        </Button>
        {(search || rooms || bathrooms || type) && (
          <Button
            disabled={loading}
            size='icon'
            variant='outline'
            type='submit'
            onClick={handleClearFilters}
          >
            {loading ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <X className='size-4' />
            )}
          </Button>
        )}
      </div>
    </form>
  )
}
