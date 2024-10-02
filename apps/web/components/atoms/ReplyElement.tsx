/* eslint-disable @next/next/no-img-element */
import React from "react"

type ReplyElementProps = {
  reply?: string;
  files?: string[];
  isSender: boolean;
}

export default function ReplyElement(props: ReplyElementProps): JSX.Element {
  const { reply, isSender, files } = props;

  return (
    <div className={
      ` text-xs ${files ? '' : 'p-2'}
        ${files ? '' : 'bg-stone-500/20 w-fit pb-3'}
        ${isSender ? 'rounded-t-full' : 'rounded-r-full'}
        ${!isSender && reply ? 'rounded-tr-full' : 'rounded-l-full'}
        ${isSender && reply ? 'rounded-tr-full' : 'rounded-tl-full'}
      `
    }>
      {!files && <span className="text-stone-300/70">{reply}</span>}
      <div>
        <div className="bg-slate-500 w-full h-full"></div>
        <img src={files && files[0]} alt="" className='w-[100px] flex object-cover rounded-lg opacity-50'/>
      </div>
    </div>
  )
}