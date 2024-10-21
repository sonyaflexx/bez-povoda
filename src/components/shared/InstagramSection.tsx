import Link from "next/link";
import Container from "../ui/Container";

export default function InstagramSection() {
    return (
        <section className="py-[42px] bg-[url('/images/inst-bg.png')] bg-cover">
            <Container>
            <div className="flex flex-col items-center">
                <span className="font-magnet-semibold text-[#717171] text-[20px]">@Bez Povoda</span>
                <h3 className="font-magnet-regular text-[40px] mb-[33px]">Мы в Instagram</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[60px] mb-[52px]">
                {[1, 2, 3].map((item) => (
                    <li key={item}>
                    <Link href={`https://instagram.com/bezpovoda_flowers72`} target="_blank" className="overflow-hidden group font-magnet-regular leading-none flex flex-col items-center gap-2 w-full max-w-[377px]">
                        <div className="relative w-full h-[461px]">
                            <img src={`/images/inst-${item}.png`} alt="" className="pointer-events-none" />
                            <div className="absolute top-0 left-0 right-0 h-full w-full bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-white text-lg font-public-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300">SEE MORE</div>
                        </div>
                    </Link>
                    </li>
                ))}
                </ul>
                <Link href={`https://instagram.com/bezpovoda_flowers72`} target="_blank" className="bg-white w-[266px] h-[66px] flex items-center justify-center font-magnet-regular text-[#717171] text-[20px] pt-1 hover:bg-[#717171] hover:text-white transition-colors duration-300">Join our Feed</Link>
            </div>
            </Container>
      </section>
    )
}