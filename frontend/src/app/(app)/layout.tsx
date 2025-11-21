"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Sidebar} from "@/components/replica/SideBar";
import { Header } from "@/components/replica/Header";
import MobileDrawer from "@/components/replica/MobileDrawer";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
export default function DashbordLayout({children}){
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<any>(false);
    const [open, setOpen] = useState<any>(false);
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            if(user){
                console.log("Login/User", user);
                setUser(user);
            }else{
                console.log("Not Login");
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe()
    }, []);
    const toggleSidebar = () => {
        setOpen(prev => {
            const next = !prev;
            if (next) {
                localStorage.setItem("aside_open", "true");
            } else {
                localStorage.removeItem("aside_open");
            }
            return next;
        });
    };
    const closeSideBar = ()=>{
        setOpen(false);
        localStorage.removeItem("aside_open");
    }
    return(
        <div className="min-h-screen flex flex-col bg-[#050510] text-scale-100">
            <div className="hidden md:block">
                {open && (
                    <Sidebar onClose={closeSideBar}/>
                )}
            </div>
            <div className="flex-1 md:ml-60 flex flex-col">
                <Header onToggleSidebar={toggleSidebar}/>
                <main className="flex-1">
                    {children}
                </main>                   
            </div>
        </div>
    );
}