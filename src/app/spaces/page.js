import { getLargeSpace, getSmallSpace } from "@/lib/db";
import Section from "@/components/section";
import SpaceCard from "@/components/spaceCard";

export default async function SpacesPage(params) {
    const smallSpaces = await getSmallSpace();
    const largeSpaces = await getLargeSpace();

    return (
        <div className="m-10">
            <Section title="พื้นที่ทำงานสำหรับ 1-3 ท่าน" seeAllHref="/books">
                <div className="flex flex-wrap gap-[50px] justify-center">
                    {smallSpaces.map((space) => (
                        <SpaceCard key={space.space_id} space={space} />
                    ))}
                </div>
            </Section>
            <Section title="พื้นที่ทำงานสำหรับ 4 ท่านขึ้นไป" seeAllHref="/books">
                <div className="flex flex-wrap gap-[50px] justify-center">
                    {largeSpaces.map((space) => (
                        <SpaceCard key={space.space_id} space={space} />
                    ))}
                </div>
            </Section>
        </div>
    );
}