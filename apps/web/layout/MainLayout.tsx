import React from 'react'
import Sidebar from '../components/organisms/Sidebar'

type MainLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-full relative h-screen overflow-hidden ">
      <div className="flex flex-row z-50">
        <Sidebar />
        <div className="bg-color3 text-white w-full relative h-screen">{children}</div>
      </div>
    </div>
  )
}

