import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col" id="inicio">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        {children}
      </main>
      <Footer />
    </div>
  );
};
