'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function Login() {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  async function handleLoginSubmit({email, password}: LoginSchema) {
    'use serve'
    try {
      const result = await signIn("credentials", {email, password, redirect: false })

      if (result.error) {
        console.error(result.error);
        toast.error(
          'Falha no servidor',
        )
      } else {
        router.push('/')
      }
    } catch (err) {
      toast.error(
        'Falha ao tentar fazer o login, verifique os campos e tente novamente',
      )
    }
  }

  console.log(errors)

  return (
    <div className="h-screen w-full flex items-center flex-col gap-8 px-6 justify-center">
      <h1 className="text-center text-4xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className="w-full max-w-80 flex flex-col gap-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu e-mail..."
            {...register('email')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            placeholder="Digite sua senha..."
            {...register('password')}
          />
        </div>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
          Entrar
        </Button>
      </form>
    </div>
  )
}
