function grouped(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\u202f|\u00a0/g, " ");
}

export function formatFCFA(value: number) {
  return `${grouped(value)} FCFA`;
}

export function formatFromFCFA(value: number) {
  return `From ${grouped(value)} FCFA`;
}
