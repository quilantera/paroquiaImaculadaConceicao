"use client";
import React, { useState } from 'react';
import { User, Home, FileText, Settings, Layers, Menu, Calendar, Users2, ArrowRightIcon, ArrowLeft } from 'lucide-react';
import { SidebarLink } from './SidebarLink';


// Definindo a estrutura do item do menu
interface MenuItem {
  icon: React.ReactNode;
  text: string;
  url: string;
}

// Lista de links do menu
const menuItems: MenuItem[] = [
  { icon: <Home />, text: 'Início', url: '/inicio' },
  { icon: <FileText />, text: 'Perfil', url: '/perfil' },
  { icon: <Settings />, text: 'Configurações', url: '/configuracoes' },
  { icon: <Layers />, text: 'Pastas', url: '/pastas' },
  { icon: <Users2 />, text:'Integrantes', url:'/integrantes' },
  { icon: <Calendar />, text: 'Calendario', url: '/calendario' },
];


// Props do componente Sidebar
interface SidebarProps {
  userName: string;
}

// Componente Sidebar
export function Sidebar({ userName }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Alternar entre expandir e retrair a sidebar
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  // Alternar visibilidade em dispositivos móveis
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      {/* Botão para exibir a sidebar em telas pequenas */}
      <button
        onClick={toggleVisibility}
        className="hidden sm:block fixed top-4 left-4 p-2 bg-sky-500 text-white rounded-lg z-20"
      >
        <Menu className="text-2xl" />
      </button>

      {/* Sidebar */}
      <aside
        className={`sm:fixed  relative h-screen p-4  sm:mt-[10vh] flex flex-col justify-center items-center bg-sky-950 transition-width duration-300 z-10
          ${isCollapsed ? 'w-16' : 'w-56'}
          ${isVisible ? 'sm:block' : 'sm:hidden'}
          `}
      >
        {/* Seção do usuário */}
        <div className="flex items-center mb-6 ">
          <User className="text-2xl text-slate-50" />
          {!isCollapsed && <span className="ml-3 text-lg font-semibold  text-slate-50   ">{userName}</span>}
        </div>

        {/* Lista de links */}
        <div className="flex flex-col space-y-2">
          {menuItems.map((item, index) => (
            <SidebarLink
              key={index}
              icon={item.icon}
              text={item.text}
              url={item.url}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        {/* Botão para expandir/retrair */}
        <button
          onClick={toggleSidebar}
          className="mt-8 p-2 min-w-10  w-full flex justify-center  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isCollapsed ? <ArrowRightIcon/> : <ArrowLeft/>}
        </button>
      </aside>
    </div>
  );
}
