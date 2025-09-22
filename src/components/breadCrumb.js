import { ChevronRight } from "lucide-react";
import styles from "./breadCrumb.module.css";
import Link from "next/link";

export default function BreadCrumb({ items }) {
    return (
        <div className={styles.breadcrumb}>
            {items.map((item, index) => (
                <span key={index} className={styles.breadcrumbItem}>
                    {item.href ? (
                        <Link href={item.href} className={styles.breadcrumbLink}>{item.label}</Link>
                    ) : (
                        <span className={styles.breadcrumbCurrent}>{item.label}</span>
                    )}
                    {index < items.length - 1 && <ChevronRight size={16} />}
                </span>
            ))}
        </div>
    );
}