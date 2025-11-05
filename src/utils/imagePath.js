import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export function getBookCover(path, size=null) {
    if (path.endsWith("_cover")) {
        const { data } = supabase.storage.from("book_cover").getPublicUrl(path);
        return data.publicUrl;
    } else {
        return `https://covers.openlibrary.org/b/id/${path}-${size}.jpg`
    }
}