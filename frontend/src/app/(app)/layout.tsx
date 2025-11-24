"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Sidebar } from "@/components/replica/SideBar";
import { Header } from "@/components/replica/Header";
import {MobileSidebar} from "@/components/replica/MobileSidebar";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Preahvihear } from "next/font/google";
import nextAppLoader from "next/dist/build/webpack/loaders/next-app-loader";
export default function DashbordLayout({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('login User', user);
                setUser(user);
            } else {
                console.log('Not Login', user);
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe()
    }, []);
    // const toggleSidebar = () => {
    //     setOpen(prev => {
    //         const next = !prev;
    //         if (next) {
    //             localStorage.setItem("aside_open", "true");
    //         } else {
    //             localStorage.removeItem("aside_open");
    //         }
    //         return next;
    //     });
    // };
    // const closeSideBar = ()=>{
    //     setOpen(false);
    //     localStorage.removeItem("aside_open");
    // }
    const toggleSidebar = async () => {
        setOpen(prev => {
            const next = !prev;
            if (next) {
                localStorage.setItem('aside_open', "true");
            } else {
                localStorage.setItem('aside_open', 'false');
            }
            return next;
        })
    }
    const closeSidebar = () => {
        setOpen(false);
        localStorage.setItem('aside_open', 'false');
    }
    return (
        <div className="min-h-screen flex bg-[#000000]  ">
            <div className="hidden md:block">
                {!isOpen && (
                    <Sidebar  />
                )}
            </div>
            {isOpen && (
            <div className="flex-1 flex flex-col">
                <Header />
                <MobileSidebar/>
                <main className="flex-1 mt-4">
                    {children}
                </main>
            </div>
            )}
            {!isOpen && (
            <div className="flex-1  md:ml-60 flex flex-col">
                <Header />
                <MobileSidebar/>
                <main className="flex-1 mt-4">
                    {children}
                </main>
            </div>
            )}
        </div>
    );
}
// "use client";

// import { useState, useEffect } from "react";
// import { Sidebar } from "@/components/replica/SideBar";
// import { Header } from "@/components/replica/Header";
// import { MobileSidebar } from "@/components/replica/MobileSidebar";
// import { auth } from "@/firebase";
// import { onAuthStateChanged } from "firebase/auth";

// export default function DashboardLayout({ children }) {
//     const [user, setUser] = useState<any>(null);
//     const [loading, setLoading] = useState<any>(true);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setUser(user);
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, []);

//     if (loading) return null;

//     return (
//         <div className="min-h-screen bg-[#050510] text-white">
//             {/* ===== Header ===== */}
//             <Header />

//             {/* ===== Mobile Drawer Sidebar ===== */}
//             <MobileSidebar />

//             {/* ===== Main Layout ===== */}
//             <div className="flex">
                
//                 {/* --- PC Sidebar (固定) --- */}
//                 <aside className="hidden md:block w-60 h-screen sticky top-0 border-r border-white/10">
//                     <Sidebar />
//                 </aside>

//                 {/* --- Content --- */}
//                 <main className="flex-1 min-h-screen px-6 py-4">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// }
