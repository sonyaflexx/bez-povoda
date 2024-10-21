'use client'

const FooterForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <article className="py-[100px] flex gap-5 items-center justify-center w-full font-public-sans">
            <div className="max-w-[486px]">
                <h3 className="font-semibold text-[19px]">Получайте последние новости от Без Причины</h3>
                <p className="font-light text-[16px]">Узнайте первым о новых поступлениях, акциях, стиле вдохновения и эксклюзивные снимки</p>
            </div>
            <form onSubmit={handleSubmit} className="flex max-w-[646px] w-full border border-[#717171]">
                <input type="email" placeholder="Введите ваш Email" className="w-full h-[60px] px-5 border text-[16px] font-light outline-none" />
                <button type="submit" className="flex items-center justify-center uppercase text-[16px] text-white min-w-[177px] bg-[#717171] font-medium">Отправить</button>
            </form>
        </article>
    )
}

export default FooterForm