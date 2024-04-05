import Testimonial from "./Testimonial";
import { Title } from "../../../components/texts/Title";
import { Rating } from "./Rating";

export const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center text-center p-10">
      <div className="flex flex-col items-start justify-start text-start p-10  w-full md:w-1/2">
        <Title title="What Users Say About InExperto" />
        <p className="mt-4 text-sm font-light text-gray-500">
          New talents can sign up, follow our easy guide, and start applying to
          jobs in minutes. Employers can sign up and instantly start posting
          jobs and hiring talent based on their needs. Our algorithm will match
          the best candidates with the best jobs, based on their skills only.
        </p>
        {/* rating with circles */}
        <Rating />
        <span className="mt-4 text-sm font-bold text-blue-950">
          Overall Custome Ratings
        </span>
      </div>
      <div className="flex flex-col items-center justify-center text-center p-10w-full md:w-1/2">
        {/* grid of 2x2 but the right has only one item put this in middle of all the grid*/}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Testimonial
            author="Maria S."
            citation="InExperto helped me land my dream job, even though I had no prior experience"
            text="Thanks to InExperto, I found the perfect job that matched my skills and gave me the opportunity to grow"
          />
          <div className="row-span-2 self-center bg-slate-500 col">
            <Testimonial
              author="Luis M."
              citation="Life-changing opportunity, thanks to InExperto"
              text="As an employer, InExperto helped me find talented individuals, even those without experience, and gave them a chance to prove themselves"
            />
          </div>

          <Testimonial
            author="Qui L."
            citation="InExperto opened doors for me"
            text="InExperto helped me land my dream job, even though I had no prior experience"
          />
        </div>
      </div>
    </div>
  );
};
