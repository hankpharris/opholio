import Image from 'next/image';

interface ProjectCardImageProps {
    src: string;
    alt: string;
}

export function ProjectCardImage({ src, alt }: ProjectCardImageProps) {
    return (
        <div className="relative w-full h-64 overflow-hidden">
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority={true}
            />
        </div>
    );
} 