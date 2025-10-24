import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BreadCrumb({ items }) {
    return (
        <div className="text-sm font-medium text-(--darkgrey1) flex items-center gap-2 mx-0 my-[30px]">
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                    {item.href ? (
                        <Link href={item.href} className="hover:underline hover:underline-offset-2">{item.label}</Link>
                    ) : (
                        <span>{item.label}</span>
                    )}
                    {index < items.length - 1 && <ChevronRight size={16} />}
                </span>
            ))}
        </div>
    );
}