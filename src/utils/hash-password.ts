import { genSaltSync, hashSync } from 'bcrypt-ts'

export function hashPassword(password: string) {
  const salt = genSaltSync(10)
  return hashSync(password, salt)
}
