export function formatCurrency(value: string) {
  if (!value) return 'R$ 0,00'

  const cleanValue = value.replace(/\D/g, '')
  const numValue = parseFloat(cleanValue) / 100

  return numValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
