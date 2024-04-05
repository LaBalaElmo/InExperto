import { useLocation } from "react-router-dom";
import BGJob from "../../assets/backgorund/bgjob.png";
import { UnderlineButton } from "../buttons/UnderlineButton";
import { useState } from "react";
import Modal from "../decorations/Modal";
// import SendMessage from "../forms/sendMessage/SendMessage";
import { toast } from "sonner";
import { makePageActor } from "../../../service/actors";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../declarations/user/user.did";
import ApplicantCard from "./ApplicantCard";

type JobCardProps = {
    id: string;
    title: string;
    description: string;
    page: string;
    date: string;
    theme?: "normal" | "small";
};

const cardConfig = {
    normal: {
        imgH: "h-64",
    },
    small: {
        imgH: "h-32",
    },
};

const pageActor = makePageActor();

function JobCard({
    id,
    title,
    description,
    page,
    date,
    theme = "normal",
}: JobCardProps) {
    const location = useLocation();
    const [apply, setApply] = useState(false);
    const { auth } = useAuth();

    function aplicaciones() {
        setApply(true);
    }

    function aplicar() {
        // const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
        toast.promise(pageActor.postulate(auth.token, BigInt(id)), {
            loading: "Cargando...",
            success: (_) => {
                return `${auth.user.name} te has postulado exitosamente!`;
            },
            error: "Error al postularse",

            action: {
                label: "Deshacer",
                onClick: () => console.log("Undo"),
            },
        });
        // setApply(true);
    }

    return (
        <div className="shadow-lg border rounded-lg">
            {apply && (
                <Modal setModal={setApply}>
                    <ShowApplicants id={id} />
                </Modal>
            )}
            <section className="bg-slate-500 rounded-t-lg">
                <img
                    src={BGJob}
                    className={`rounded-t-lg ${cardConfig[theme].imgH} w-full object-cover`}
                />
            </section>
            <section className="p-4 grid gap-2">
                <h2 className="text-xl text-blue-800 font-bold">{title}</h2>
                <h3 className="text-lg text-gray-500 font-semibold">{page}</h3>
                <p>{description}</p>
            </section>
            <section className="px-4 pb-4 text-blue-800 flex justify-between items-center gap-2">
                <UnderlineButton
                    theme="secondary"
                    onClick={
                        location.pathname.includes("page")
                            ? aplicaciones
                            : aplicar
                    }
                >
                    {location.pathname.includes("page")
                        ? "Aplicaciones"
                        : "Contrátame!"}
                </UnderlineButton>
                <p>{date}</p>
            </section>
        </div>
    );
}

export default JobCard;

type ShowApplicantsProps = {
    id: string;
};

function ShowApplicants({ id }: ShowApplicantsProps) {
    const { auth } = useAuth();
    const applicants = useQuery({
        queryKey: ["Applicants"],
        queryFn: getApplicants,
    });

    function getApplicants() {
        return pageActor.getApplicantsFromPost(auth.token, BigInt(id));
    }

    console.log(applicants, "applicants", id, "id");

    const applicantsData = applicants.data?.ok?.map((applicant: User) => {
        return {
            id: applicant?.id[0]?.toString(),
            name: applicant.name,
        };
    });

    return (
        <div className="bg-white rounded-md p-4 h-1/2 w-4/5 sm:w-3/5 flex flex-col gap-4">
            <h1 className="font-bold text-2xl text-blue-900">Aplicantes</h1>
            {applicantsData?.length !== 0 ? (
                applicantsData
                    ?.reverse()
                    .map((applicant: any) => (
                        <ApplicantCard
                            key={applicant.id}
                            id={applicant.id}
                            title={applicant.name}
                        />
                    ))
            ) : (
                <p className="text-gray-500 text-center text-xl self-center">
                    No hay aplicantes 😢
                </p>
            )}
        </div>
    );
}
