interface AboutContentProps {
    title?: string;
    tagline?: string;
    aboutContent?: string;
    avatarImageUrl?: string | null;
}

export function AboutContent({
    title = "About Me",
    tagline,
    aboutContent = "",
    avatarImageUrl,
}: AboutContentProps) {
    const paragraphs = aboutContent
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    return (
        <div className="container max-w-3xl mx-auto px-8 py-12 bg-white/30 rounded-xl shadow-2xl backdrop-blur-md border border-white/25 relative z-10">
            <h1 className="text-4xl font-bold mb-3 text-center text-black drop-shadow-lg">{title}</h1>
            {tagline && <p className="text-center text-gray-800 mb-8">{tagline}</p>}
            <div className="flex justify-center mb-8">
                <img
                    src={avatarImageUrl || "/opholio-mark.png"}
                    alt="Avatar"
                    className="w-64 h-64 rounded-full object-cover"
                />
            </div>
            <div className="text-lg text-gray-800 leading-relaxed space-y-4">
                {paragraphs.length > 0 ? (
                    paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
                ) : (
                    <p>Add your About content from the admin panel.</p>
                )}
            </div>
        </div>
    );
}
