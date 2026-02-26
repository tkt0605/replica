// "use client";
// // import { ReactNode } from "react";
// import React from "react";  
// import { useState } from "react";
// import { useEffect } from "react";
// import { Sidebar } from "@/components/replica/SideBar";
// import { Header } from "@/components/replica/Header";
// import {MobileSidebar} from "@/components/replica/MobileSidebar";
// import { auth } from "@/lib/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { Preahvihear } from "next/font/google";

// export default function DashbordLayout({ children }: { children: React.ReactNode }) {
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [isOpen, setOpen] = useState(false);
//     const [user, setUser] = useState<any>(null);
//     const [loading, setLoading] = useState<any>(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 console.log('login User', user);
//                 setUser(user);
//             } else {
//                 console.log('Not Login', user);
//                 setUser(null);
//             }
//             setLoading(false);
//         });
//         return () => unsubscribe()
//     }, []);
//     const toggleSidebar = async () => {
//         setOpen(prev => {
//             const next = !prev;
//             if (next) {
//                 localStorage.setItem('aside_open', "true");
//             } else {
//                 localStorage.setItem('aside_open', 'false');
//             }
//             return next;
//         })
//     }
//     const closeSidebar = () => {
//         setOpen(false);
//         localStorage.setItem('aside_open', 'false');
//     }
//     return (
//         <div className="min-h-screen flex bg-[#000000]  ">
//             <div className="hidden md:block">
//                 {!isOpen && (
//                     <Sidebar  />
//                 )}
//             </div>
//             {isOpen && (
//             <div className="flex-1 flex flex-col">
//                 <Header />
//                 <MobileSidebar/>
//                 <main className="flex-1 mt-4">
//                     {children}
//                 </main>
//             </div>
//             )}
//             {!isOpen && (
//             <div className="flex-1  md:ml-60 flex flex-col">
//                 <Header />
//                 <MobileSidebar/>
//                 <main className="flex-1 mt-4">
//                     {children}
//                 </main>
//             </div>
//             )}
//         </div>
//     );
// }
"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/replica/SideBar";
import { Header } from "@/components/replica/Header";
import { MobileSidebar } from "@/components/replica/MobileSidebar";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

// 型定義
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashbordLayout({ children }: DashboardLayoutProps) {
    const [isOpen, setOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u ?? null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen flex bg-[#000000]">
            <div className="hidden md:block">
                {!isOpen && (
                    <Sidebar />
                )}
            </div>
            
            <div className={`flex-1 flex flex-col ${!isOpen ? 'md:ml-60' : ''}`}>
                <Header />
                <MobileSidebar/>
                <main className="flex-1 mt-4">
                    {children}
                </main>
            </div>
        </div>
    );
}