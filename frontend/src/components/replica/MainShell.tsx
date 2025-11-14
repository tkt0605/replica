import { ReactNode } from "react";
export function MainShell({children}: {children: ReactNode}){
    return(
        <main className="flex-1 pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-4">{children}</div>
        </main>
    );
}