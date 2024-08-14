import React from "react"

type ReplyElementProps = {
  reply?: string
  isSender: boolean;
}

export default function ReplyElement(props: ReplyElementProps): JSX.Element {
  const { reply, isSender } = props;
  return (
    <div className={
      ` text-xs p-2
       bg-stone-500/20 w-fit pb-3
        ${isSender ? 'rounded-t-full' : 'rounded-r-full'}
        ${!isSender && reply ? 'rounded-tr-full' : 'rounded-l-full'}
        ${isSender && reply ? 'rounded-tr-full' : 'rounded-tl-full'}
      `
    }>
      <span className="text-stone-300/70">{reply}</span>
    </div>
  )
}