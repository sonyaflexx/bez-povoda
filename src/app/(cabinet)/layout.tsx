import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Container from "@/components/ui/Container";
import { isAuth } from "@/lib/isAuth";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}