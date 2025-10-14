import { getLargeSpace, getSmallSpace } from "@/lib/db";
import Section from "@/components/section";
import SpaceCard from "@/components/spaceCard";
import styles from "./page.module.css"

export default async function SpacesPage(params) {
    const smallSpaces = await getSmallSpace();
    const largeSpaces = await getLargeSpace();

    return (
        <div className={styles.page}>
            <Section title="พื้นที่ทำงานสำหรับ 1-3 ท่าน" seeAllHref="/books">
                <div className={styles.list}>
                    {smallSpaces.map((space) => (
                        <SpaceCard key={space.space_id} space={space} />
                    ))}
                </div>
            </Section>
            <Section title="พื้นที่ทำงานสำหรับ 4 ท่านขึ้นไป" seeAllHref="/books">
                <div className={styles.list}>
                    {largeSpaces.map((space) => (
                        <SpaceCard key={space.space_id} space={space} />
                    ))}
                </div>
            </Section>
        </div>
    );
}