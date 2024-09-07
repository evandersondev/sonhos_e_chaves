'use client'

import { Filters } from '@/components/filters'
import { FiltersMobile } from '@/components/filters-mobile'
import { api } from '@/lib/api'
import type { ImmobileType } from '@/types/immobile-type'
import { useWindowWidth } from '@/utils/use-window-width'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { ImmobilesList } from './_components/immobiles-list'

interface ResponseData {
  immobiles: ImmobileType[]
  totalCount: number
  totalPages: number
  currentPage: number
}

type ImmobilesProps = {
  searchParams?: {
    q?: string
    rooms?: string
    bathrooms?: string
    garage?: string
    type?: string
  }
}

export default function Immobiles() {
  const searchParams = useSearchParams()
  const windowWidth = useWindowWidth()
  const [immobiles, setImmobiles] = useState<ImmobileType[]>([])
  const [totalCount, setTotalCount] = useState<number>()
  const [totalPages, setTotalPages] = useState<number>()
  const [currentPage, setCurrentPage] = useState<number>()

  async function load(page?: number) {
    const { data } = await api.get<ResponseData>('/immobiles', {
      params: {
        q: searchParams.get('q'),
        rooms: searchParams.get('rooms'),
        bathrooms: searchParams.get('bathrooms'),
        type: searchParams.get('type'),
        page
      }
    })

    setImmobiles(data.immobiles)
    setTotalCount(data.totalCount)
    setTotalPages(data.totalPages)
    setCurrentPage(data.currentPage)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Suspense fallback={<div />}>
      <div className='container'>
        <div className='h-full w-full gap-6'>
          <div className='py-8 space-y-4 md:space-y-8 h-full flex flex-col'>
            {windowWidth > 768 ? (
              <Filters onHanldeSearch={load} />
            ) : (
              <FiltersMobile onHanldeSearch={load} />
            )}

            <ImmobilesList
              immobiles={immobiles}
              totalCount={totalCount}
              totalPages={totalPages}
              currentPage={currentPage}
              onHanldeSearch={load}
            />
          </div>
        </div>
      </div>
    </Suspense>
  )
}
