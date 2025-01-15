import Link from "next/link";

// Props do componente SidebarLink
interface SidebarLinkProps {
    icon: React.ReactNode;
    text: string;
    url: string;
    isCollapsed: boolean;
  }
  
  // Componente de link da Sidebar
  export function SidebarLink({ icon, text, url, isCollapsed }: SidebarLinkProps) {
    return (
      <Link href={url} className="flex items-center p-2 text-slate-50 hover:bg-sky-700 rounded-lg transition-colors">
        <span className="text-lg">{icon}</span>
        {!isCollapsed && <span className="ml-3">{text}</span>}
      </Link>
    );
  }
  