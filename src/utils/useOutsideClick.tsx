export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }
  return handleClick
}
