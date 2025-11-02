"use client"

export default function SearchBar() {
    return (
        <div className="w-[45vw] h-[45px] flex-1">
            <input className="w-full h-full text-sm bg-(--white) text-(--black) px-5 py-0 rounded-[20px] border-(--lightgrey1) border-2" type="text" placeholder="ค้นหา . . ." />
        </div>
    );
}
