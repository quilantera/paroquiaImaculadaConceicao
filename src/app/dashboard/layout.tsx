import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <>
        <main className="flex  w-full bg-slate-100 min-h-screen text-gray-700">
        <Sidebar userName={"Piloto"}/>
            {children}
        </main>
        </>
    )
}