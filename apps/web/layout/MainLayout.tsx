import React from 'react'
import Sidebar from '../components/organisms/Sidebar'
import AlertModal from '../components/molecules/AlertModal';
import { useModalContext } from '../context/ModalContext';
import FormModal from '../components/molecules/FormModal';

type MainLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { chatId, isOpen, modalType } = useModalContext();

  return (
    <div className="w-full relative h-screen">
      <div className="flex flex-row z-40">
        <Sidebar />
        <div className="bg-color3 text-white w-full relative h-screen">{children}</div>
      </div>
      <AlertModal 
        isOpen={isOpen && modalType === 'alert'} 
        chatId={chatId}
        />
      <FormModal 
        isOpen={isOpen && modalType === 'form'}
      />
    </div>
  )
}

