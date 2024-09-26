import { IoImage } from "react-icons/io5";
import Tooltip from "./Tooltip";
import { ChangeEvent } from "react";

type UploadFileProps = {
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadFile(props: UploadFileProps): JSX.Element {
  const { handleFile  } = props;
  return (
    <Tooltip 
      content="Attach a file"
      placement='top'
      paddingSize='xs'
      size='xs'
    >
      <div className='flex items-center'>
        <label htmlFor="upload" className='p-2 rounded-full hover:bg-stone-600 cursor-pointer'>
          <input id='upload' type='file' multiple accept='files' className='hidden' onChange={handleFile}/>
          <IoImage className='text-xl text-chsms-orange'/>
        </label>
      </div>
    </Tooltip>
  )
}