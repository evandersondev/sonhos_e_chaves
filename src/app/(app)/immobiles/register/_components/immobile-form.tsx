'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createImmobile } from '@/data/create-immobile'
import { editImmobile } from '@/data/edit-immobile'
import { getImmobileFromCode } from '@/data/get-immobile-from-code'
import { supabase } from '@/lib/supabase'
import { ImmobileType } from '@/types/immobile-type'
import { formatCurrency } from '@/utils/format-currency'
import { zodResolver } from '@hookform/resolvers/zod'
import crypto from 'crypto'
import { ImagePlus, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const immobileSchema = z.object({
  code: z.string(),
  name: z.string().optional(),
  address: z.string(),
  type: z.string(),
  price: z.string(),
  size: z.string(),
  rooms: z
    .string().optional(),
  bathrooms: z
    .string().optional(),
  garage: z
    .string()
    .optional(),
  description: z.string().optional(),
  files: z.array(z.instanceof(File)),
  photoPreview: z.string().url().optional(),
})

type ImmobileSchema = z.infer<typeof immobileSchema>

interface ImmobileFormProps {
  immobile?: ImmobileType
}

export function ImmobileForm({ immobile }: ImmobileFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ImmobileSchema>({
    resolver: zodResolver(immobileSchema),
    defaultValues: immobile
      ? {
        code: immobile.code,
        name: immobile.name,
        address: immobile.address,
        type: immobile.type,
        price: immobile.price,
        size: immobile.size,
        rooms: String(immobile.rooms),
        bathrooms: String(immobile.bathrooms),
        garage: String(immobile.garage),
        description: immobile.description,
        files: [],
        photoPreview: immobile.photoPreview,
      }
      : {
      }
  })

  const code = watch('code')
  const price = watch('price', immobile ? immobile.price : '')
  const type = watch('type', immobile ? immobile.type : '')
  const filesData = watch('files', [])
  const photoPreview = watch('photoPreview', immobile ? immobile.photoPreview : null);

  async function handleRegisterSubmit(data: ImmobileSchema) {
    try {
      const photosId: string[] = []
      const folderExists = await supabase.storage
        .from('images')
        .list(`${code}`)

      if (folderExists.data.length > 1) {
        for await (const file of filesData) {
          const response = await supabase.storage
            .from(`images/${data.code}`)
            .update(file.name, file)

          const result = await supabase.storage
            .from(`images/${data.code}`)
            .getPublicUrl(response.data.path)

          photosId.push(result.data.publicUrl)
        }
      } else {
        for await (const file of filesData) {
          const response = await supabase.storage
            .from(`images/${data.code}`)
            .upload(file.name, file)

          const result = await supabase.storage
            .from(`images/${data.code}`)
            .getPublicUrl(response.data.path)

          photosId.push(result.data.publicUrl)
        }
      }

      await createImmobile({
        code: code,
        name: data.type !== 'condominium' ? '' : data.name,
        address: data.address,
        type: data.type,
        price: data.price,
        size: data.size,
        rooms: Number(data.rooms),
        bathrooms: Number(data.bathrooms),
        garage: Number(data.garage),
        description: data.description,
        photosId
      })

      reset()

      toast.success('Imóvel cadastrado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Falha ao cadastrar Imóvel!')
    }
  }

  async function handleEditSubmit(data: ImmobileSchema) {
    try {
      await editImmobile({
        id: immobile.id,
        code: data.code,
        name: data.name,
        address: data.address,
        type: data.type,
        price: data.price,
        size: data.size,
        rooms: Number(data.rooms),
        bathrooms: Number(data.bathrooms),
        garage: Number(data.garage),
        description: data.description,
        photosId: immobile.photosId,
        photoPreview: photoPreview,
      })

      toast.success('Imóvel editado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Falha ao editar Imóvel!')
    }
  }

  async function generateUniqueCode() {
    'use serve'

    const value: string = crypto
      .randomBytes(6)
      .toString('hex')
      .slice(0, 6)
      .toLocaleUpperCase()

    const immobile = await getImmobileFromCode(value)

    if (immobile) {
      generateUniqueCode()
    }

    setValue('code', value)
  }

  useEffect(() => {
    if (immobile) {
      setValue('code', immobile.code)
    } else {
      generateUniqueCode()
    }
  }, [])

  return (
    <form
      onSubmit={handleSubmit(
        immobile ? handleEditSubmit : handleRegisterSubmit
      )}
      className='w-full flex flex-col gap-8'
    >
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex flex-col gap-6'>
          <div className='space-y-1'>
            <Label htmlFor='code'>Código</Label>
            <Input
              disabled
              id='code'
              placeholder='Digite o código'
              data-error={!!errors.code?.message}
              className='data-[error=true]:ring-red-500 data-[error=true]:ring-offset-2 data-[error=true]:ring-2'
              {...register('code')}
            />
          </div>

          <div className='space-y-1'>
            <Label htmlFor='address'>Localidade</Label>
            <Input
              id='address'
              placeholder='Digite a localidade'
              {...register('address')}
            />
          </div>

          <div className='space-y-1'>
            <Label htmlFor='price'>Preço</Label>
            <Input
              id='price'
              placeholder='R$ 0,00'
              {...register('price')}
              value={price}
              data-error={!!errors.price?.message}
              className='data-[error=true]:ring-red-500 data-[error=true]:ring-offset-2 data-[error=true]:ring-2'
              onChange={e => {
                const valueFomatted = formatCurrency(e.target.value)
                setValue('price', valueFomatted)
              }}
            />
          </div>

          <div className='space-y-1'>
            <Label htmlFor='description'>Descrição</Label>
            <Textarea
              className='resize-none'
              rows={10}
              id='description'
              placeholder='Descrição...'
              {...register('description')}
            />
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          {(type === 'condominium' ||
            type === 'apartment' ||
            type === 'residential') && (
              <div className='space-y-1'>
                <Label htmlFor='size'>Nome do condomínio</Label>
                <Input
                  id='name'
                  disabled={!!immobile}
                  placeholder='Digite o nome do condomínio'
                  data-error={!!errors.name?.message}
                  className='data-[error=true]:ring-red-500 data-[error=true]:ring-offset-2 data-[error=true]:ring-2'
                  {...register('name')}
                />
              </div>
            )}

          <div className='space-y-1'>
            <Label htmlFor='type'>Tipo</Label>
            <Select
              {...register('type')}
              onValueChange={e => setValue('type', e)}
              defaultValue={type}
              value={type}
              disabled={!!immobile}
            >
              <SelectTrigger id='type' className='w-full'>
                <SelectValue placeholder='Tipo' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo</SelectLabel>
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

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <Label htmlFor='rooms'>Quartos</Label>
              <Input
                type='number'
                id='rooms'
                defaultValue={immobile && immobile.rooms}
                data-error={!!errors.rooms?.message}
                className='data-[error=true]:ring-red-500 data-[error=true]:ring-offset-2 data-[error=true]:ring-2'
                placeholder='Quantidade de quartos'
                {...register('rooms')}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='bathrooms'>Banheiros</Label>
              <Input
                type='number'
                id='bathrooms'
                defaultValue={immobile && immobile.bathrooms}
                data-error={!!errors.bathrooms?.message}
                className='data-[error=true]:ring-red-500 data-[error=true]:ring-offset-2 data-[error=true]:ring-2'
                placeholder='Quantidade de banheiros'
                {...register('bathrooms')}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <Label htmlFor='garage'>Caragem</Label>
              <Input
                type='number'
                id='garage'
                defaultValue={immobile && immobile.garage}
                placeholder='Quantidade de garagens'
                {...register('garage')}
              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='size'>Tamanho em m²</Label>
              <Input
                id='size'
                type='number'
                placeholder='Digite o tamanho'
                {...register('size')}
              />
            </div>
          </div>

          {immobile && (
            <div className='space-y-1'>

              <Label>Foto de destaque</Label>
              <div className='w-full h-full gap-1 grid grid-cols-7'>
                {immobile.photosId.map(photo => {
                  return (
                    <Image
                      onClick={() => setValue('photoPreview', photo)}
                      data-preview={photoPreview === photo}
                      className='w-20 h-20 cursor-pointer rounded-md border-transparent data-[preview=true]:border-primary border-2 border-spacing-4 p-0.5'
                      width={500}
                      height={500}
                      key={photo}
                      src={photo}
                      alt={photo}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {!immobile && (
            <Label
              className='w-full h-40 lg:h-full flex flex-col gap-4 items-center justify-center bg-zinc-50 hover:border-orange-200 cursor-pointer transition-colors border rounded-md'
              htmlFor='files'
            >
              <ImagePlus className='size-8 text-zinc-400' />
              {filesData.length === 0 && (
                <span className='text-sm text-muted-foreground'>
                  Selecionar imagens
                </span>
              )}
              {filesData.length > 0 && (
                <span className='font-medium text-orange-500'>
                  {filesData.length} imagens selecionados
                </span>
              )}
              <Input
                id='files'
                type='file'
                accept='image/*'
                multiple
                onChange={e => {
                  const filesArray = Array.from(e.target.files)
                  setValue('files', filesArray)
                }}
                data-error={!!errors.code?.message}
                className='sr-only w-fit data-[error=true]:ring-red-500 data-[error=true]:ring-offset-2 data-[error=true]:ring-2'
              />
            </Label>
          )}
        </div>
      </div>

      <Button
        disabled={isSubmitting}
        type='submit'
        className='col-span-2 self-end w-fit'
      >
        {isSubmitting && <Loader2 className='size-4 mr-2 animate-spin' />}
        {immobile ? 'Editar' : 'Salvar'}
      </Button>
    </form>
  )
}
