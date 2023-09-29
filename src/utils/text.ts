import { VALID_URL } from "@/enums/regex"

export const highlightText = (value: string, search: string): string => {
  if (!search || !value) return value
  const regex = new RegExp(`${search}`, "igm")
  const match = value.match(regex)
  value = value.replace(
    regex,
    `<span class="highlighted-text">${match?.[0]}</span>`
  )

  return value
}

export const shortenText = (text: string, quantity = 100) => {
  if (text.length <= quantity) return text
  text.slice(0, quantity)
  return text.slice(0, quantity) + "..."
}

export const checkCorrectLinkFormat = (link: string) => {
  const regex = new RegExp(VALID_URL, "g")
  return regex.test(link);
}

export function capitalizeFirstLetter(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}