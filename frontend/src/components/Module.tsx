import { ModuleProps } from "../PropsTypes";

const Module = ({ title, icon }: ModuleProps) => {
  return (
    <div className="w-full flex items-center justify-center pb-16">
      <div className="sm:w-3/4 w-full 2xl:w-1/5 flex flex-col items-center py-16 md:py-12 border-2 hover:bg-blue-400 bg-blue-200 border-black rounded-lg cursor-pointer">
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center text-6xl">
            {icon}
            <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-center">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module;
