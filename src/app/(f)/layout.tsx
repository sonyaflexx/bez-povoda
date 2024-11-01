import Footer from "@/components/shared/Footer";
import FooterForm from "@/components/shared/Footer/FooterForm";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <FooterForm />
            <Footer />
        </>
    );
}