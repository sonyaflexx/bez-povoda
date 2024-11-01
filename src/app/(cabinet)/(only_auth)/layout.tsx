import { isAuth } from "@/lib/isAuth";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    if (!isAuth()) {
        redirect('/auth/sign-in');
    }

    return (
        <>
            {children}
        </>
    );
}