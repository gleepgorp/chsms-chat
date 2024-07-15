import MainLayout from "../layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="h-screen">
        <span className="text-2xl text-stone-100">You are logged in!</span>
      </div>
    </MainLayout>
  );
} 