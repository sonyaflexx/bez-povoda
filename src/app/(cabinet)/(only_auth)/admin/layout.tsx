import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { userData } = useAuth();
    
    if (userData?.userType !== 'Administrator') {
        redirect('/profile');
    }

    return (
        <>
            {children}
        </>
    );
}