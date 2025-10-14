import { getSpaceById } from "@/lib/db";
import { UsersRound, Tags, Rocket } from 'lucide-react';
import BreadCrumb from "@/components/breadCrumb";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css"

export default async function SpaceDetailPage({ params }) {
    const { space_id } = await params;
    const space = await getSpaceById(space_id);
    const imageUrl = space.space_type.image_path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${space.space_type.image_path}` : '/noImage.png';

    return (
        <div className={styles.page}>
            <BreadCrumb items={[
                { href: "/spaces", label: "พื้นที่ทำงาน" },
                { label: `${space.space_id} - ${space.space_name}` }
            ]} />
            <div className={styles.layout}>
                <div className={styles.imageContainer}>
                    <Image src={imageUrl} alt={`${space.space_name} image`} fill priority className={styles.image} />
                </div>
                <div className={styles.info}>
                    <div className={styles.detail}>
                        <div className={styles.metaItem}>
                            <span className={styles.label}>ชื่อพื้นที่ทำงาน</span>
                            <span className={styles.value}>{space.space_name}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.label}>รายละเอียด</span>
                            <span className={styles.value}>{space.space_type.facilities}</span>
                        </div>
                    </div>
                    <div className={styles.specContainer}>
                        <div className={styles.spec}>
                            <div className={styles.metaItem}>
                                <span className={styles.label}>ขนาดพื้นที่</span>
                                <span className={styles.value}>{space.space_type.area} ตร.ม.</span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.label}>โซนที่นั่ง</span>
                                <span className={styles.value}>โซน {space.space_id[0]}</span>
                            </div>
                        </div>
                        <div className={styles.spec}>
                            <div className={styles.metaItem}>
                                <span className={styles.label}>ประเภทพื้นที่ทำงาน</span>
                                <div className={styles.specValues}>
                                    <span className={styles.value}>
                                        <UsersRound strokeWidth={2} />
                                        {space.space_type.capacity} คน
                                    </span>
                                    <span className={styles.value}>
                                        <Tags strokeWidth={2} />
                                        {space.space_type.price} บาท/ชั่วโมง
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link href={`/spaces/${space.space_id}/booking`} className={styles.linkButton}>
                    <Rocket color="var(--white)" size={24} strokeWidth={2} />
                    จองพื้นที่ทำงาน
                </Link>
            </div>
        </div>
    );
}