"use client";

import { setHours, setMinutes, add, format, differenceInMinutes } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarClock, Tags, UsersRound } from "lucide-react";
import { useState } from "react";

export default function BookingForm({ spaceData, userData, tierData }) {
    const [payMethod, setPayMethod] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    function getTotalPrice(start, end) {
        return spaceData.space_type.price * (differenceInMinutes(end, start) + 1) / 60;
    }

    const payments = [
        { id: 1, label: "Payment 1" },
        { id: 2, label: "Payment 2" },
        { id: 3, label: "Payment 3" },
    ];

    return (
        <div className="floatLayout">
            <div className="flex gap-[30px]">
                <div className="flex w-[65%] flex-col gap-[30px]">
                    <div className="rounded-[20px] border-2 border-solid border-(--lightgrey1) p-[30px]">
                        <h2 className="text-xl font-medium">เลือกวันและเวลา</h2>
                        <div className="relative flex w-full gap-[25px]">
                            <div className="flex w-1/2 flex-col gap-2">
                                <label htmlFor="start">วันและเวลาเริ่มต้น</label>
                                <DatePicker
                                    selected={start}
                                    onChange={(dateTime) => {
                                        setStart(dateTime);
                                        setEnd(null);
                                    }}
                                    showTimeSelect
                                    timeIntervals={30}
                                    dateFormat="dd/MM/yyyy HH:mm น."
                                    timeFormat="HH:mm น."
                                    placeholderText="เลือกวันและเวลา"
                                    className="h-12 w-full rounded-[20px] border-2 border-(--lightgrey1) px-3"
                                    calendarClassName="z-50"
                                    popperClassName="z-50"
                                    minTime={setHours(setMinutes(new Date(), 0), 10)}
                                    maxTime={setHours(setMinutes(new Date(), 30), 21)}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="flex w-1/2 flex-col gap-2">
                                <label htmlFor="end">เวลาสิ้นสุด</label>
                                <DatePicker
                                    selected={end}
                                    onChange={(time) => setEnd(time)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    dateFormat="HH:mm น."
                                    timeFormat="HH:mm น."
                                    placeholderText="เลือกวันและเวลา"
                                    className="h-12 w-full rounded-[20px] border-2 border-(--lightgrey1) px-3"
                                    calendarClassName="z-50"
                                    popperClassName="z-50"
                                    minTime={
                                        start
                                            ? add(start, { minutes: 29 })
                                            : setHours(setMinutes(new Date(), 29), 10)
                                    }
                                    maxTime={setHours(setMinutes(new Date(), 0), 22)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 rounded-[20px] border-2 border-solid border-(--lightgrey1) p-[30px]">
                        <h3 className="text-xl font-medium">เลือกวิธีการชำระเงิน</h3>
                        <div className="flex justify-around">
                            {payments.map((payment) => (
                                <label key={payment.id}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={payment.id}
                                        checked={payMethod === payment.id}
                                        onChange={() => setPayMethod(payment.id)}
                                        className="hidden"
                                    />
                                    <div
                                        className={`flex h-48 w-60 cursor-pointer items-center justify-center rounded-xl transition-colors duration-200 ${payMethod === payment.id ? "bg-(--lightblue) text-white" : "bg-(--darkblue) text-white/80"} `}
                                    >
                                        {payment.label}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex w-[35%] flex-col gap-5 rounded-[20px] border-2 border-solid border-(--lightgrey1) p-[30px]">
                    <h4 className="mb-[30px] text-center text-xl font-medium">
                        สรุปรายการ
                    </h4>
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium">ชื่อพื้นที่ทำงาน</span>
                        <span className="text-sm font-normal text-(--darkblue)">
                            {spaceData.space_name}
                        </span>
                    </div>
                    <div className="flex rounded-[20px] border-2 border-solid border-(--lightgrey1) px-[30px] py-5">
                        <div className="flex w-full flex-col gap-4 text-sm">
                            <span className="font-medium text-(--black)">ขนาดพื้นที่</span>
                            <span className="flex items-center gap-2 whitespace-nowrap text-(--darkblue)">
                                {spaceData.space_type.area} ตร.ม.
                            </span>
                        </div>
                        <div className="flex w-full flex-col gap-4 text-sm">
                            <span className="font-medium text-(--black)">โซนที่นั่ง</span>
                            <span className="flex items-center gap-2 whitespace-nowrap text-(--darkblue)">
                                โซน {spaceData.space_id[0]}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 rounded-[20px] border-2 border-solid border-(--lightgrey1) px-[30px] py-5">
                        <span className="font-medium text-(--black)">
                            ประเภทพื้นที่ทำงาน
                        </span>
                        <div className="flex w-full gap-[40%]">
                            <span className="flex items-center gap-2 whitespace-nowrap text-(--darkblue)">
                                <UsersRound strokeWidth={2} />
                                {spaceData.space_type.capacity} คน
                            </span>
                            <span className="flex items-center gap-2 whitespace-nowrap text-(--darkblue)">
                                <Tags strokeWidth={2} />
                                {spaceData.space_type.price} บาท/ชั่วโมง
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 rounded-[20px] border-2 border-solid border-(--lightgrey1) px-[30px] py-5">
                        <span className="font-medium text-(--black)">วันและเวลา</span>
                        <span className="flex items-center gap-2 whitespace-nowrap text-(--darkblue)">
                            <CalendarClock strokeWidth={2} />
                            {start && end
                                ? `${format(start, "dd/MM/yyyy HH:mm")} น. - ${format(end, "HH:mm")} น.`
                                : "กรุณาเลือกวันและเวลาจอง"}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="text-[16px] font-normal">ราคา</span>
                            <span className="text-[16px] font-normal text-(--lightblue)">
                                {" "}
                                {start && end ? getTotalPrice(start, end) : 0} บาท
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[16px] font-normal">ส่วนลดสมาชิก</span>
                            <span className="text-[16px] font-normal text-(--lightblue)">
                                - {tierData.discount_percentage} %
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[16px] font-medium">ทั้งหมด</span>
                            <span className="text-[16px] font-medium text-(--lightblue)">
                                {start && end
                                    ? (
                                        getTotalPrice(start, end) *
                                        (1 - tierData.discount_percentage / 100)
                                    ).toFixed(2)
                                    : 0}{" "}
                                บาท
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="button w-52 disabled:w-fit"
                    disabled={!start || !end || !payMethod}
                >
                    {!start || !end || !payMethod ? (
                        "กรุณาเลือกเวลาและวิธีการชำระเงิน"
                    ) : (
                        <>
                            <Tags strokeWidth={2} />
                            ชำระเงิน
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
