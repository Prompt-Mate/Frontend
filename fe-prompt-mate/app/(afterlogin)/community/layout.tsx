// app/community/layout.tsx
export default function CommunityLayout({
                                            children,
                                            modal,
                                        }: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}
