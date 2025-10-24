import Link from 'next/link';

export default function Section({ title, seeAllHref, children }) {
    return (
        <section className="mx-0 my-[30px]">
            <div className="flex justify-between font-medium items-baseline mb-[30px]">
                <h2 className="text-xl font-medium text-(--black)">{title}</h2>
                {seeAllHref && (
                    <Link className="text-(--lightblue)" href={seeAllHref}>ดูทั้งหมด</Link>
                )}
            </div>
            {children}
        </section>
    );
}