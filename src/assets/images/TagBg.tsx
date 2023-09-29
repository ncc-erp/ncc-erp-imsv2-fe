interface Props {
  fill?: string
  height?: number
  width?: number
}
export const TagBg = (props: Props) => {
  return (
    <svg
      width={props.height}
      height={props.width}
      viewBox="0 0 93 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H93V37H0V0Z" fill={props.fill} />
      <path d="M46.5 67L0 37H93L46.5 67Z" fill={props.fill} />
    </svg>
  )
}
