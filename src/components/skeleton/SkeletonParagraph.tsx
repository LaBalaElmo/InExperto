export const SkeletonParagraph = () => {
  return (
    <div className="p-5 space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
      </div>
      <div className="h-2 bg-slate-700 rounded"></div>
    </div>
  );
};
