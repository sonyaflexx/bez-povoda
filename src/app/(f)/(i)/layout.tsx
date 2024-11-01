import Header from "@/components/shared/Header";

export default function Layout(
    { children }: { children: React.ReactNode }
) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}