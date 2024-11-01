import { isAuth } from "@/lib/isAuth";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    if (isAuth()) {
        redirect('/profile');
    }

    return (
        <>
            {children}
        </>
    );
}