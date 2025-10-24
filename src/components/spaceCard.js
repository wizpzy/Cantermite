import { UsersRound, Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SpaceCard({ space }) {
  const imageUrl = space.space_type.image_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${space.space_type.image_path}`
    : "/noImage.png";
  return (
    <div className="flex h-80 w-[300px] flex-col overflow-hidden rounded-[20px] shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
      <div className="relative h-1/2 w-full">
        <Image src={imageUrl} alt={`${space.space_name} image`} fill />
      </div>
      <div className="flex h-1/2 flex-col justify-between p-5 text-sm">
        <div className="text-(--darkblue) font-medium overflow-hidden min-h-[calc(1.5em)]">
          {space.space_id} - {space.space_name}
        </div>
        <div className="flex justify-between">
          <span className="flex gap-2 items-center">
            <UsersRound color="var(--black)" size={18} strokeWidth={2} />
            {space.space_type.capacity} คน
          </span>
          <span className="flex gap-2 items-center">
            <Tags color="var(--black)" size={18} strokeWidth={2} />
            {space.space_type.price} บาท/ชั่วโมง
          </span>
        </div>
        <Link href={`/spaces/${space.space_id}`} className="button">
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}
