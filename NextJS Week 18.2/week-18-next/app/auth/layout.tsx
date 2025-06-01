import { NavBar } from "@/components/navbar";

export default function AuthLayout({children}){
    return <div>
        <NavBar/>
        {children}
    </div>
}