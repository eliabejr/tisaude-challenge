export const formatBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatUSD = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'USD',
})

export function formatPCT(value: any) {
  return (parseFloat(value) * 100).toFixed(2) + '%'
}