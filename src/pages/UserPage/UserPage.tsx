import { useParams } from "react-router-dom";
import Banner from "../../components/decorations/Banner";
import JobCard from "../../components/cards/JobCard";
import InfoCard from "../../components/cards/InfoCard";
import { pageInfo as PageInfo } from "../../data/page";
// import { jobsData } from "../../data/profile";
import CreatePost from "../../components/forms/createPost/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { makePageActor } from "../../../service/actors";
import useAuth from "../../hooks/useAuth";
import { Post } from "../../declarations/user/user.did";

const pageActor = makePageActor();

function UserPage() {
    const { id } = useParams();
    const { auth } = useAuth();

    const myJobs = useQuery({
        queryKey: ["MyJobs"],
        queryFn: getMyJobs,
    });

    const page = useQuery({
        queryKey: ["MyPage"],
        queryFn: getPage,
    });

    function getPage() {
        return pageActor.getPagesById(auth.token, [BigInt(id as string)]);
    }

    function getMyJobs() {
        // console.log("id", id);
        // console.log("auth", auth.token);
        return pageActor.getPostFromPage(auth.token, BigInt(id as string));
    }

    const pageData = page.data?.ok[0];

    const pageInfo = {
        title: pageData?.name,
        description: pageData?.description,
    };

    const myJobsData = myJobs.data?.ok?.map((job: Post) => {
        return {
            id: job.id.toString(),
            page: job.page[0]?.name!,
            title: job.title,
            date: job.creationDate,
            description: job.description,
        };
    });

    return (
        <div>
            <Banner
                description={pageInfo?.description}
                title={pageInfo?.title}
            />
            <div className="grid gap-4 p-4 items-start md:grid-cols-[1fr_2.5fr_1fr]">
                <span className="sticky top-4 hidden md:flex md:flex-col md:gap-2">
                    <InfoCard info={PageInfo.info} title={PageInfo.title} />
                </span>
                <div className="flex flex-col gap-4">
                    <CreatePost />
                    {myJobsData?.reverse().map((job: any) => (
                        <JobCard
                            id={job.id.toString()}
                            key={job.id}
                            page={job.page}
                            title={job.title}
                            date={job.date}
                            description={job.description}
                        />
                    ))}
                </div>
                <div className="sticky top-4 hidden md:block">
                    {/* <h3>Recomendaciones</h3> */}
                    <JobCard
                        id="48"
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

export default UserPage;
