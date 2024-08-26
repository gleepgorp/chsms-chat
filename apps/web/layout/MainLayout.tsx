import React from 'react'
import Sidebar from '../components/organisms/Sidebar'
import AlertModal from '../components/molecules/AlertModal';
import { useModalContext } from '../context/ModalContext';

type MainLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { chatId, isOpen } = useModalContext();

  return (
    <div className="w-full relative h-screen">
      <div className="flex flex-row z-40">
        <Sidebar />
        <div className="bg-color3 text-white w-full relative h-screen">{children}</div>
      </div>
      <AlertModal isOpen={isOpen} chatId={chatId}/>
    </div>
  )
}

