import { shortenText } from "@/utils"
import React, { useState } from "react"

const MAX_STRING = 135

export default function QuickNewsItem({ content }: { content: string }) {
  const [isShowMore, setIsShowMore] = useState(true)
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: isShowMore ? shortenText(content, MAX_STRING) : content
        }}
      />

      {content.length > MAX_STRING && (
        <div
          className="more-text"
          onClick={() => setIsShowMore(!isShowMore)}
          aria-hidden="true"
          role="button"
        >
          {isShowMore ? "Read more" : "Read less"}
        </div>
      )}
    </>
  )
}
