import { getSpaceById } from "@/lib/db";
import { UsersRound, Tags, Rocket } from 'lucide-react';
import BreadCrumb from "@/components/breadCrumb";
import Image from "next/image";
import Link from "next/link";

export default async function SpaceDetailPage({ params }) {
    const { space_id } = await params;
    const space = await getSpaceById(space_id);
    const imageUrl = space.space_type.image_path ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${space.space_type.image_path}` : '/noImage.png';

    return (
      <div className="m-10">
        <BreadCrumb
          items={[
            { href: "/spaces", label: "พื้นที่ทำงาน" },
            { label: `${space.space_id} - ${space.space_name}` },
          ]}
        />
        <div className="floatLayout">
          <div className="w-full h-[300px] relative overflow-hidden rounded-[15px]">
            <Image
              src={imageUrl}
              alt={`${space.space_name} image`}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="flex gap-[30px] text-sm">
            <div className="border-(--lightgrey1) w-[65%] flex flex-col gap-[30px] p-[30px] rounded-[20px] border-2 border-solid">
              <div className="flex flex-col gap-2 w-full">
                <span className="font-medium">ชื่อพื้นที่ทำงาน</span>
                <span className="text-(--darkblue)">{space.space_name}</span>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="font-medium">รายละเอียด</span>
                <span className="text-(--darkblue)">
                  {space.space_type.facilities}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[30px] w-[35%]">
              <div className="border-(--lightgrey1) flex p-[30px] rounded-[20px] border-2 border-solid">
                <div className="flex flex-col gap-2 w-full">
                  <span className="font-medium">ขนาดพื้นที่</span>
                  <span className="text-(--darkblue)">
                    {space.space_type.area} ตร.ม.
                  </span>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <span className="font-medium">โซนที่นั่ง</span>
                  <span className="text-(--darkblue)">โซน {space.space_id[0]}</span>
                </div>
              </div>
              <div className="border-(--lightgrey1) flex p-[30px] rounded-[20px] border-2 border-solid">
                <div className="flex flex-col gap-2 w-full">
                  <span className="font-medium">ประเภทพื้นที่ทำงาน</span>
                  <div className="w-full flex">
                    <div className="text-(--darkblue) flex gap-2 whitespace-nowrap items-center w-1/2">
                      <UsersRound strokeWidth={2} />
                      {space.space_type.capacity} คน
                    </div>
                    <div className="text-(--darkblue) flex gap-2 whitespace-nowrap items-center w-1/2">
                      <Tags strokeWidth={2} />
                      {space.space_type.price} บาท/ชั่วโมง
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
          <Link
            href={`/spaces/${space.space_id}/booking`}
            className="button w-52"
          >
            <Rocket color="var(--white)" size={24} strokeWidth={2} />
            จองพื้นที่ทำงาน
          </Link>
          </div>
        </div>
      </div>
    );
}