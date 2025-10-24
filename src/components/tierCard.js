import { Check, Clock, BookOpenText, Tag } from "lucide-react";

const colorDict = {
    "Guest": {
        mainColor: "text-(--darkgrey1)",
        bgColor: "bg-[#D9D9D940]",
        borderColor: "border-(--darkgrey1)",
        buttonColor: "bg-(--darkgrey1)"
    },
    "Silver": {
        mainColor: "text-(--blue)",
        bgColor: "bg-[#C1CEE040]",
        borderColor: "border-(--blue)",
        buttonColor: "bg-(--blue)"
    },
    "Gold": {
        mainColor: "text-(--yellow)",
        bgColor: "bg-[#F1E1AF40]",
        borderColor: "border-(--yellow)",
        buttonColor: "bg-(--yellow)"
    },
    "Platinum": {
        mainColor: "text-(--purple)",
        bgColor: "bg-[#E8DDEF40]",
        borderColor: "border-(--purple)",
        buttonColor: "bg-(--purple)"
    }
}

export default function TierCard({ tierData }) {
    return (
        <div className={`flex h-[400px] w-xs flex-col rounded-[20px] bg-(--lightgrey2) p-6 gap-[30px] shadow-[0_0_45.4px_rgba(0,0,0,0.2)] ${tierData.current ? `border-2 ${colorDict[tierData.tier].borderColor}` : ""}`}>
            <div className="flex flex-col">
                <span className="font-medium">{tierData.tier.toUpperCase()}</span>
                <span className="text-xs text-(--darkgrey1)">สมาชิกระดับ {tierData.tier.toUpperCase()}</span>
                <div className={`flex gap-[5px] items-center ${colorDict[tierData.tier].mainColor}`}>
                    <span className="font-medium text-[48px] ">{tierData.monthly_fee}฿</span>
                    <span className="text-xs ">ต่อเดือน</span>
                </div>
            </div>
            <div className={`flex flex-col rounded-[20px] ${colorDict[tierData.tier].bgColor} w-full h-fit p-5 gap-4`}>
                <div className="flex justify-between">
                    <div className="flex text-xs gap-2 items-center">
                        <Clock size={18} />
                        ระยะเวลาการยืมหนังสือ
                    </div>
                    <span className="text-xs text-(--blue)">{tierData.borrow_day} วัน</span>
                </div>
                <div className="flex justify-between">
                    <div className="flex text-xs gap-2 items-center">
                        <BookOpenText size={18} />
                        จำนวนหนังสือที่สามารถยืม
                    </div>
                    <span className="text-xs text-(--blue)">{tierData.borrow_count} เล่ม</span>
                </div>
                <div className="flex justify-between">
                    <div className="flex text-xs gap-2 items-center">
                        <Tag size={18} />
                        ส่วนลดการจอง working space
                    </div>
                    <span className="text-xs text-(--blue)">{tierData.discount_percentage} %</span>
                </div>
            </div>
            <button disabled={tierData.current} className={tierData.current ? `button flex gap-1 ${colorDict[tierData.tier].buttonColor} cursor-default`: `button ${colorDict[tierData.tier].buttonColor}`}>
                {tierData.current ?
                    <>
                        <Check color="var(--white)" strokeWidth={2} />
                        <span>แผนปัจจุบัน</span>
                    </>
                    : "เลือกแผนนี้"}
            </button>
        </div>
    );
}
