export default function ProtectedHeader({
    header_info,
}: {
    header_info: {
        title: string;
        description: string;
    };
}) {
    return (
        <>
            <header className="relative bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                        {header_info.title}
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-500">
                        {header_info.description}
                    </p>
                </div>
            </header>
        </>
    );
}
