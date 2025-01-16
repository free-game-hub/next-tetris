interface HeroProps {
    title: string;
    subtitle: string;
}

export default function Hero({ title, subtitle}: HeroProps) {
    return (
        <section className="relative flex items-center justify-center">
            <div className="absolute inset-0 z-10" />
            <div className="relative z-20 text-center px-4 max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 leading-tight">{title}</h1>
                <p className="">{subtitle}</p>
            </div>
        </section>
    );
}
