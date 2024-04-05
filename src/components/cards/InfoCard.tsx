import { IconoirProvider, ProfileCircle } from "iconoir-react";
import BGProfile from "../../assets/backgorund/bgprofile.jpg";
import { Link } from "react-router-dom";
import { LineInfo } from "../texts/LineInfo";
import { ReactNode } from "react";

type InfoCardProps = {
    title: string;
    info: {
        id: number;
        title: string;
        children: ReactNode;
    }[];
};

function InfoCard({ title, info }: InfoCardProps) {
    return (
        <div className="bg-white border w-full rounded-md flex flex-col shadow-lg">
            <section className="relative bg bg-slate-500 rounded-t-md grid place-items-center">
                <img
                    src={BGProfile}
                    className="h-32 rounded-t-lg object-cover w-full
                "
                />
                <section className="absolute top-20">
                    <IconoirProvider
                        iconProps={{
                            width: "60px",
                            height: "60px",
                            fill: "#64748b",
                        }}
                    >
                        <ProfileCircle />
                    </IconoirProvider>
                </section>
            </section>

            <section className="px-4 py-6 grid gap-2">
                <Link to={"/profile"}>
                    <h2 className="text-lg font-semibold underline">{title}</h2>
                </Link>

                {info.map((item) => {
                    return (
                        <LineInfo key={item.id} title={item.title}>
                            {item.children}
                        </LineInfo>
                    );
                })}
            </section>
        </div>
    );
}

export default InfoCard;
