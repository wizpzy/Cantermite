import { UsersRound, Tags } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './spaceCard.module.css';

export default function SpaceCard({space}) {
    const imageUrl = space.space_type.image_path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${space.space_type.image_path}` : '/noImage.png';
    return (
        <div className={styles.cardContainer}>
            <Image src={imageUrl} alt={`${space.space_name} image`} width={300} height={160} />
            <div className={styles.info}>
                <div className={styles.name}> {space.space_id} - {space.space_name}</div>
                <div className={styles.specContainer}>
                    <span className={styles.spec}>
                        <UsersRound color='var(--black)' size={18} strokeWidth={2} />
                        {space.space_type.capacity} คน
                    </span>
                    <span className={styles.spec}>
                        <Tags color='var(--black)' size={18} strokeWidth={2} />
                        {space.space_type.price} บาท/ชั่วโมง
                    </span>
                </div>
                <Link href={`/spaces/${space.space_id}`} className={styles.linkButton}>ดูรายละเอียด</Link>
            </div>
        </div>
    )
}