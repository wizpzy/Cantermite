import BreadCrumb from "@/components/breadCrumb";
import { getAuthSession } from "@/lib/session";
import { getSpaceById, getUserById, getUserCurrentTier, getTier } from "@/lib/db";
import BookingForm from "./bookingForm";

export default async function BookingPage({ params }) {
    const { space_id } = await params;
    const space = await getSpaceById(space_id);
    const session = await getAuthSession();
    const userData = session?.userId ? await getUserById(session.userId, { address: true }) : null;
    const tier = await getUserCurrentTier(session?.userId);
    const tierData = await getTier(tier);
    
    return (
        <div className="m-10">
            <BreadCrumb items={[
                            { href: "/spaces", label: "พื้นที่ทำงาน" },
                            { href: `/spaces/${space_id}`, label: `${space.space_id} - ${space.space_name}` },
                            { label: "จองพื้นที่ทำงาน"}
                        ]} />
            <BookingForm spaceData={space} userData={userData} tierData={tierData} />
        </div>
    );
}