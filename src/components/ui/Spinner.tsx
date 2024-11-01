export default function Spinner({ className }: { className?: string }) {
    return (
        <svg 
            className={`animate-spin mx-auto ${className}`}
            width="80" 
            height="80" 
            viewBox="0 0 100 100"
        >
            <defs>
                <mask id="mask">
                    {/* Прямоугольник, который обрезает четверть круга */}
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    <circle cx="50" cy="50" r="40" fill="black" />
                    <circle cx="50" cy="10" r="40" fill="white" />
                </mask>
            </defs>

            {/* Круг с обрезанной четвертью */}
            <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="black" 
                strokeWidth="4" 
                fill="transparent" 
                mask="url(#mask)"
            />
            {/* Внутренний белый круг */}
            <circle 
                cx="50" 
                cy="50" 
                r="20" 
                fill="white" 
            />
            <style jsx>{`
                svg {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </svg>
    )
}