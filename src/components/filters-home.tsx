'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Separator } from './ui/separator'

const filtersSchema = z.object({
    search: z.string(),
})

type FiltersSchemaType = z.infer<typeof filtersSchema>

export function FiltersHome() {
    const { push } = useRouter()

    const { register, handleSubmit, watch } = useForm<FiltersSchemaType>({
        resolver: zodResolver(filtersSchema),
    })

    async function handleSearchSubmit(data: FiltersSchemaType) {
        push(`/immobiles?q=${data.search}`)
    }

    const search = watch('search')

    return (
        <form onSubmit={handleSubmit(handleSearchSubmit)} className='flex  items-center gap-4 px-10 py-8 bg-white border border-zinc-200/50 rounded-xl'>
            <div className='flex w-full lg:min-w-40 flex-1 flex-col gap-2'>
                <Label htmlFor='search'>Buscar por</Label>
                <Input
                    className='w-full'
                    placeholder='Localidade, Código, Condominío'
                    {...register('search')}
                />
            </div>

            <Separator
                orientation='vertical'
                className='h-20 bg-zinc-200/50 hidden lg:block'
            />

            <div className='flex items-center w-fit gap-4 mt-5'>
                <Button
                    type='submit'
                    disabled={!search}
                    className='self-center w-full md:w-fit'
                >
                    <Search className='size-4 mr-2' />
                    Buscar
                </Button>
            </div>
        </form>
    )
}
