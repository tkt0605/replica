import { ReactNode } from "react";
export function MainShell({children}: {children: ReactNode}){
    return(
        <main className="flex-1">
            <div>{children}</div>
        </main>
    );
}