"use client"

export default function SearchBar() {
    return (
        <div className="w-[45vw] h-[45px]">
            <input className="w-full h-full text-sm bg-(--white) text-(--black) px-5 py-0 rounded-[20px]" type="text" placeholder="ค้นหา . . ." />
        </div>
    );
}
