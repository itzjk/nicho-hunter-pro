import { useState } from 'react';
import { Target, TrendingUp, Search as SearchIcon, History, Bot, Menu, X } from 'lucide-react';

export default function SidebarLayout({ children, activeTab, onTabChange }) {
    const [isOpen, setIsOpen] = useState(true);

    const navItems = [
        { id: 'search', label: 'Buscador Principal', icon: <SearchIcon size={20} /> },
        { id: 'trends', label: 'Radar de Tendencias', icon: <TrendingUp size={20} /> },
        { id: 'ai', label: 'Ideas IA (Faceless)', icon: <Bot size={20} /> },
        { id: 'history', label: 'Historial', icon: <History size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-background text-textMain overflow-hidden">

            {/* Mobile Sidebar Toggle */}
            <button
                className="md:hidden fixed z-50 bottom-4 right-4 p-4 bg-primary text-white rounded-full shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-72 bg-surface/80 backdrop-blur-xl border-r border-white/5 flex flex-col`}
            >
                <div className="p-6 flex items-center gap-3 border-b border-white/5">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Target className="text-primary w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            Nicho Hunter <span className="text-primary">Pro</span>
                        </h1>
                        <p className="text-xs text-textMuted font-medium">Buscador Viral</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onTabChange(item.id);
                                if (window.innerWidth < 768) setIsOpen(false); // Close on mobile click
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === item.id
                                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-inner'
                                    : 'text-textMuted hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5">
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
                        <h4 className="text-sm font-bold text-accent mb-1">PRO VERSION</h4>
                        <p className="text-xs text-textMuted mb-3">Estadísticas avanzadas desbloqueadas</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-screen overflow-y-auto w-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
                <div className="relative z-10 w-full min-h-full py-10 px-4 md:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
