import { subHours, lightFormat, parseISO } from "date-fns"
import { zonedTimeToUtc } from "date-fns-tz"

function normalizeDate(date: string, hours?: number) {
  const parsedDate = parseISO(date);
  const znDate = zonedTimeToUtc(parsedDate, 'America/Sao_Paulo');
  return hours ? subHours(znDate, hours) : znDate
}

function format(date: string, format?: string) {
  const formatted = lightFormat(normalizeDate(date, 3), format || 'dd/MM/yyyy')
  return formatted
}

export {
  format,
  normalizeDate
}