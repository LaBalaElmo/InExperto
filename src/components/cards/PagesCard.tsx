import { IconoirProvider, StatsUpSquare } from "iconoir-react";
import { useNavigate } from "react-router-dom";

type PagesCardProps = {
    title: string;
    id: string;
    img?: string;
};

function PagesCard({ title, id }: PagesCardProps) {
    const navigate = useNavigate();
    return (
        <div
            className="shadow-lg rounded-xl flex gap-2 p-4 hover:cursor-pointer"
            tabIndex={0}
            onClick={() => navigate(`page/${id}`)}
        >
            <IconoirProvider>
                <StatsUpSquare />
            </IconoirProvider>
            {/* <div className="rounded-full w-4 h-4">
                <img src={img} alt="Page img" />
            </div> */}
            <h2>{title}</h2>
        </div>
    );
}

export default PagesCard;
