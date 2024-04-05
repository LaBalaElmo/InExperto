import { SkeletonParagraph } from "./SkeletonParagraph";

export const SkeletonExperience = () => {
  return (
    <div className="relative flex items-start space-x-4 bg-white rounded-lg sm:flex-row flex-col">
      <div className="z-10 w-16 h-16 bg-yellow-500 flex items-center justify-center text-blue-950 text-2xl font-bold"></div>
      <div className="absolute top-0 left-0 sm:left-4 transform -translate-x-1/2 border-r-8 border-dashed border-blue-950  h-full"></div>

      <div className="flex-1 py-4 px-6">
        <SkeletonParagraph />
        <SkeletonParagraph />
        <SkeletonParagraph />
      </div>
    </div>
  );
};
