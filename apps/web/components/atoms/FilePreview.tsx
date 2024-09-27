import { IoClose } from "react-icons/io5";
import { useChatContext } from "../../context/ChatContext";
import Image from "next/image";
import { useRouter } from "next/router";

type FilePreviewProps = {
  handleRemoveFile: (index: number) => void;
}

export default function FilePreview(props: FilePreviewProps): JSX.Element {
  const { handleRemoveFile } = props;
  const { fileList } = useChatContext();
  const router = useRouter();
  const id = router.query.id as string;

  // find current chat files base on url id
  const currentChatFiles = fileList.find(file => file.chatId === id)?.files || [];
  const notEmptyFileList = currentChatFiles.map(item => item.length !== 0);

  // map chat files 
  const images = currentChatFiles.map((item, index) => {
    return (
      <div key={index} className='flex-shrink-0 relative'>
        <Image src={item} alt="" className='object-cover rounded-lg h-[50px] w-[50px]' width={0} height={0}/>
        <button onClick={() => handleRemoveFile(index)} className='bg-stone-800 absolute -top-2 -right-2 p-1 rounded-full cursor-pointer hover:bg-stone-900'>
          <IoClose className='text-stone-100'/>
        </button>
      </div>  
    )
  });

  if (currentChatFiles.length === 0) { return null };
  
  return (
    <div className={`preview ${notEmptyFileList && "h-69px max-h-[84px] rounded-t-xl bg-stone-700 p-3"} w-full flex gap-3 overflow-auto`}>
      {images}
    </div>
  ) 
}