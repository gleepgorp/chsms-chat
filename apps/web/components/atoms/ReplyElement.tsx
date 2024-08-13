import React from "react"

type ReplyElementProps = {
  reply?: string
}

export default function ReplyElement(props: ReplyElementProps): JSX.Element {
  const { reply } = props;
  return (
    <div className="text-xs p-2 bg-stone-500/40 rounded-l-full">
      {reply}
    </div>
  )
}