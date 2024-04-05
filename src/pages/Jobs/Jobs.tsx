import JobCard from "../../components/cards/JobCard";
import InfoCard from "../../components/cards/InfoCard";
import Banner from "../../components/decorations/Banner";
import { YellowButton } from "../../components/buttons/YellowButton";
import { useState } from "react";
import Modal from "../../components/decorations/Modal";
import CreatePageForm from "../../components/forms/createPage/CreatePageForm";
import { makePageActor } from "../../../service/actors";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Page, Post } from "../../declarations/page/page.did";
import PagesCard from "../../components/cards/PagesCard";
const pageActor = makePageActor();

function Jobs() {
    const [createJob, setCreateJob] = useState(false);
    const { auth } = useAuth();
    const jobs = useQuery({
        queryKey: ["Jobs"],
        queryFn: getAllJobs,
    });

    const pages = useQuery({
        queryKey: ["Pages"],
        queryFn: getAllUserPages,
    });

    const jobsData = jobs.data?.ok?.map((job: Post) => {
        return {
            id: job.id.toString(),
            page: job.page[0]?.name!,
            title: job.title,
            date: job.creationDate,
            description: job.description,
        };
    });

    function getAllJobs() {
        return pageActor.getPostsForUser(auth.token) || [];
    }

    function getAllUserPages() {
        return pageActor.getPagesByUser(auth.token) || [];
    }

    const infoUser = [
        {
            id: 1,
            title:
                auth.user.skills[0]!.length > 1 ? "Habilidades" : "Habilidad",
            children:
                auth.user.skills[0]!.length > 1
                    ? `${auth.user.skills[0]![0]}...`
                    : auth.user.skills[0]![0],
        },
        {
            id: 2,
            title: "Fecha de Nacimiento",
            children: auth.user.birthDate,
        },
        {
            id: 3,
            title: "Cédula de identidad",
            children: auth.user.ci,
        },
        {
            id: 4,
            title: "Email",
            children: auth.user.email,
        },
    ];
    return (
        <div>
            {createJob && (
                <Modal setModal={setCreateJob}>
                    <CreatePageForm />
                </Modal>
            )}
            <Banner
                title="Trabajos"
                description="Encuentra tu trabajo ideal 🤓"
            />
            <div className="grid gap-4 p-4 items-start md:grid-cols-[1fr_2.5fr_1fr]">
                <span className="sticky top-4 hidden md:flex md:flex-col md:gap-2">
                    <InfoCard
                        info={infoUser}
                        title={`${auth.user.name} ${auth.user.lastname}`}
                    />
                    {/* <button onClick={() => console.log(pages.data)}>
                        prueba
                    </button> */}
                    {pages.data?.ok?.map((page: Page) => {
                        return (
                            <PagesCard
                                title={page.name}
                                key={page.id.toString()}
                                id={page.id.toString()}
                            />
                        );
                    })}
                    <YellowButton onClick={() => setCreateJob(true)}>
                        Crear Página
                    </YellowButton>
                </span>
                <div className="flex flex-col gap-4">
                    {jobsData?.length === 0 ? (
                        <p className="text-gray-500 text-xl self-center text-center">
                            No hay publicaciones disponibles 😢
                        </p>
                    ) : (
                        jobsData
                            ?.reverse()
                            .map((job: any) => (
                                <JobCard
                                    id={job.id}
                                    key={job.id}
                                    page={job.page}
                                    title={job.title}
                                    date={job.date}
                                    description={job.description}
                                />
                            ))
                    )}
                </div>
                <div className="sticky top-4 hidden md:block">
                    {/* <h3>Recomendaciones</h3> */}
                    <JobCard
                        id="48my"
                        theme="small"
                        page="Job Page"
                        title="Job Title"
                        date="25/04/2021"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus omnis assumenda soluta, maxime a adipisci aut voluptates ea id esse error sed deserunt, dolores eum, modi voluptatum sunt. Dolorem, deserunt?"
                    />
                </div>
            </div>
        </div>
    );
}

export default Jobs;
