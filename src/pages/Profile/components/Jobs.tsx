import { SkeletonExperience } from "../../../components/skeleton/SkeletonExperience";
import { Title } from "../../../components/texts/Title";
import { Experience } from "../../../declarations/user/user.did";

export interface Job {
  company: string;
  position: string;
  period: string;
  description: string;
}

const Experience: React.FC<{
  jobs: [] | [Array<Experience>];
  classNames?: string;
}> = ({ jobs, classNames }) => {
  return (
    <>
      <Title title="Experience" />
      <div className={`flex flex-col mt-3 space-y-6 ${classNames}`}>
        {jobs.map((job, index) => (
          <div
            key={index}
            className="relative flex items-start space-x-4 bg-white rounded-lg sm:flex-row flex-col"
          >
            <div className="z-10 w-16 h-16 bg-yellow-500 flex items-center justify-center text-blue-950 text-2xl font-bold">
              {index + 1}
            </div>
            <div className="absolute top-0 left-0 sm:left-4 transform -translate-x-1/2 border-r-8 border-dashed border-blue-950  h-full"></div>

            <div className="flex-1 py-4 px-6">
              <h3 className="text-gray-700 font-semibold">
                {job[0].companyName}
              </h3>
              <h4 className="text-gray-500">{job[0].position}</h4>
              <p className="text-gray-500 text-sm mt-2">
                {job[0].begin} - {job[0].finalDate}
              </p>
              <p className="text-gray-600 mt-2">{job[0].description}</p>
            </div>
          </div>
        ))}

        {!jobs.length && (
          <>
            <SkeletonExperience />
            <SkeletonExperience />
          </>
        )}
      </div>
    </>
  );
};

export default Experience;
