import { useEffect } from "react";

type PageProps = {
    title: string;
    children: React.ReactNode;
};

export default function PageWrapper({ title, children }: PageProps) {
    useEffect(() => {
        document.title = title + " | Expense Tracker";
    }, [title]);

    return <>{children}</>;
}
