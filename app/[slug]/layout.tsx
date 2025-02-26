import { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: { slug: string }
}

async function getGameMetadata(slug: string) {
    // Fetch just the light metadata
    const response = await fetch(`https://happyglass.net/api/game/${slug}`)
    return response.json()
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { metadata, thumbnail_url, slug } = await getGameMetadata(params.slug)
    const jsonMetadata = JSON.parse(metadata)
    return {
        title: `${jsonMetadata.meta_title} - Happy Glass`,
        description: jsonMetadata.meta_description,
        alternates: {
            canonical: slug === "happy-glass" ? "https://happyglass.net" : `https://happyglass.net/game/${slug}`,
        },
        openGraph: {
            title: jsonMetadata.meta_title,
            description: jsonMetadata.meta_description,
            images: thumbnail_url,
        },
    }
}
export default function GameLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
