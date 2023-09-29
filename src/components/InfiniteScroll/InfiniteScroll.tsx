import React from "react"
import styled from "styled-components"

import { HEADER_HEIGHT } from "@/enums/layout"

const InfiniteDiv = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow-y: auto;
`

interface IInfiniteScrollProps {
  onEndScroll: (() => Promise<void>) | (() => void)
  children: React.ReactNode
  className?: string
}

export default function InfiniteScroll({
  onEndScroll,
  children,
  className
}: IInfiniteScrollProps) {
  const listInnerRef = React.useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (scrollTop + clientHeight + 30 >= scrollHeight) {
        onEndScroll()
      }
    }
  }

  return (
    <InfiniteDiv
      className={className}
      ref={listInnerRef}
      onScroll={handleScroll}
    >
      {children}
    </InfiniteDiv>
  )
}
