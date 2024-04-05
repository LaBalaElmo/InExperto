import { Title } from "../texts/Title";

type BannerProps = {
    title: string;
    description: string;
};

function Banner({ title, description }: BannerProps) {
    return (
        <section className="flex items-center justify-center text-white bg-blue-950 h-auto p-3 sm:p-0 sm:h-60 flex-col gap-4">
            <Title titleColor="text-white" title={title} />
            <p className="text-gray-300 text-center font-thin">{description}</p>
        </section>
    );
}

export default Banner;
