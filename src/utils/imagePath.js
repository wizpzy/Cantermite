import supabase from "@/lib/supabase";

export function getBookCover(path, size=null) {
    if (path.endsWith("_cover")) {
        const { data } = supabase.storage.from("book_cover").getPublicUrl(path);
        return `${data.publicUrl}?t=${Date.now()}`; // Add timestamp to prevent caching
    } else {
        return `https://covers.openlibrary.org/b/id/${path}-${size}.jpg`
    }
}