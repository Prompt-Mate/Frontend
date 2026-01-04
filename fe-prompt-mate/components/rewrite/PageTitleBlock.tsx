type PageTitleBlockProps = {
    title: string;
    description: string;
};

export function PageTitleBlock({
                                   title,
                                   description,
                               }: PageTitleBlockProps) {
    return (
        <div className="space-y-2">
            <h1 className="text-pageTitle font-bold text-ui-text">
                {title}
            </h1>
            <p className="text-body font-medium text-ui-textMuted">
                {description}
            </p>
        </div>
    );
}
