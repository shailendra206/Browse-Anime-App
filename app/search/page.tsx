import BrowsePage from "@/components/browse/BrowsePage";

export default async function Browse({searchParams}: PageProps<'/search'>){
    const { q } = await searchParams
    const search = (Array.isArray(q) ? q[0] : q)?.trim() || undefined
    console.log(search)
    return(
        <>
            <BrowsePage key={search ?? ''} initialSearch={search}></BrowsePage>
        </>
    )
}