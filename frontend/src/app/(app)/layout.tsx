"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Sidebar} from "@/components/replica/SideBar";
import { Header } from "@/components/replica/Header";
import MobileDrawer from "@/components/replica/MobileDrawer";
export default function DashbordLayout({children}){
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    return(
        <div className="min-h-screen flex">
            <div className="hidden md:block">
                <Sidebar/>
            </div>
            <div className="flex-1 md:ml-60 flex flex-col">
                <Header/>
                <main className="flex-1">
                    {children}
                </main>                   
            </div>
        </div>
    );
}