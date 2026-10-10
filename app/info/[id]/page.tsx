import AnimeInfoPage from "@/components/infoPage/AnimeInfoPage";
import { getInfoPageData } from "@/lib/anilist";
import { notFound } from "next/navigation";

export default async function InfoPage({ params }: PageProps<'/info/[id]'>) {
    const { id } = await params
    const Id = Number(id)
    if (Number.isNaN(Id)) notFound()
    const data = await getInfoPageData(Id)
    if (!data) notFound()
    return (
        <>
            <AnimeInfoPage data={data} />
        </>
    )
}