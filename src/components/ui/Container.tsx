const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mx-auto w-full max-w-[1300px] max-sm:px-3">
            {children}
        </div>
    );
}

export default Container;