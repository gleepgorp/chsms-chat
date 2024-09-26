import { ReactNode } from "react";

type FilePreviewProps = {
  notEmptyFileList: boolean;
  images: ReactNode;
}

export default function FilePreview(props: FilePreviewProps): JSX.Element {
  const { notEmptyFileList, images } = props;
  
  return (
    <div className={`preview ${notEmptyFileList && "h-69px max-h-[84px] rounded-t-xl bg-stone-700 p-3"} w-full flex gap-3 overflow-auto`}>
      {images}
    </div>
  )
}