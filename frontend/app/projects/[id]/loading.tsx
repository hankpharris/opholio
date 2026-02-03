export default function Loading() {
    return (
        <div className="flex-grow flex items-center justify-center py-8">
            <div className="container mx-auto px-4 py-8 bg-white/30 rounded-xl shadow-lg backdrop-blur-md relative z-10 animate-pulse">
                <div className="h-12 bg-gray-200 rounded w-3/4 mb-8"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="mt-8 flex gap-4">
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                </div>
            </div>
        </div>
    );
} 