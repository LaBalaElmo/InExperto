import { Rating } from "./Rating";

interface TestimonialProps {
  author: string;
  text: string;
  citation: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  author,
  text,
  citation,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-blue-950 w-full md:w-full">
      <div className="flex flex-col justify-center text-start items-start">
        <div className="flex gap-5 justify-center items-center">
          <div className="flex items-center justify-center w-14 h-14 bg-yellow-500 rounded-full">
            <p className="text-white font-bold"></p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-md font-bold text-white">{author}</h1>
            <Rating isNumber={false} />
          </div>
        </div>
        <p className="text-md font-bold text-white">"{citation}"</p>
        <p className="mt-2 text-sm font-light text-white">{text}</p>
      </div>
    </div>
  );
};

export default Testimonial;
