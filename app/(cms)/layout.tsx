// import Footer from "./component-shared.tsx/footer";
import Header from "./component-shared/header";
import Sidebar from "./component-shared/sidebar";
import Topbar from "./component-shared/topbar";


export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Topbar />
          <div className="bg-gray-100 h-full p-6">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
