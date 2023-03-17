const Card: React.FC = () => {
  return (
    <>
      <div className="w-full bg-gray-200 dark:bg-gray-900 py-10">
        <div className="container mx-auto px-6 flex items-start justify-center">
          <div className="w-full">
            {/* Card is full width. Use in 12 col grid for best view. */}
            {/* Card code block start */}
            <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 shadow rounded">
              <div className="flex flex-col items-start">
                <div className="w-full pr-0">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded">
                      <img
                        className="w-full h-full overflow-hidden object-cover rounded object-center"
                        src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_28.png"
                        alt="logo"
                      />
                    </div>
                    <div className="ml-2">
                      <h5 className="text-gray-800 dark:text-gray-100 font-medium text-base">
                        Fitbit Incorporation
                      </h5>
                      <p className="text-gray-600 dark:text-gray-400 text-xs font-normal">
                        San Diego, California
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm text-gray-600 dark:text-gray-400 font-normal">
                    The web has witnessed mammoth advances; however a website’s
                    success still depends on just one thing: how users interact
                    with it.
                  </p>
                </div>
                <div className="w-full flex flex-col items-start">
                  <div className="mr-12 flex items-center mt-5">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl leading-6 mb-1">
                      24
                    </h2>
                    <p className="ml-2 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
                      Milestones
                    </p>
                  </div>
                  <div className="mr-12 flex mt-5">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl leading-6 mb-1">
                      03
                    </h2>
                    <p className="ml-2 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
                      Teams Assigned
                    </p>
                  </div>
                  <div className="mt-5 flex">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl leading-6 mb-1">
                      14
                    </h2>
                    <p className="ml-2 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
                      Tasks Pending
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <hr className="mt-8 mb-8 h-1 rounded bg-gray-200" />
                <hr className="absolute top-0 h-1 w-2/3 rounded bg-indigo-400" />
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center w-full justify-start">
                  <div className="border-2 border-white dark:border-gray-700 shadow rounded-full w-10 h-10">
                    <img
                      className="w-full h-full overflow-hidden object-cover rounded-full"
                      src="https://dh-ui.s3.amazonaws.com/assets/webapp/layout/grid_cards/grid_card8.jpg"
                      alt="avatar"
                    />
                  </div>
                  <div className="-ml-4 border-2 border-white dark:border-gray-700 shadow rounded-full w-10 h-10">
                    <img
                      className="w-full h-full overflow-hidden object-cover rounded-full"
                      src="https://dh-ui.s3.amazonaws.com/assets/webapp/layout/grid_cards/grid_card9.jpg"
                      alt="avatar"
                    />
                  </div>
                  <div className="-ml-4 border-2 border-white dark:border-gray-700 shadow rounded-full w-10 h-10">
                    <img
                      className="w-full h-full overflow-hidden object-cover rounded-full"
                      src="https://dh-ui.s3.amazonaws.com/assets/webapp/layout/grid_cards/grid_card10.jpg"
                      alt="avatar"
                    />
                  </div>
                  <div className="-ml-4 border-2 border-white dark:border-gray-700 shadow rounded-full w-10 h-10">
                    <img
                      className="w-full h-full overflow-hidden object-cover rounded-full"
                      src="https://dh-ui.s3.amazonaws.com/assets/webapp/layout/grid_cards/grid_card11.jpg"
                      alt="avatar"
                    />
                  </div>
                  <div className="-ml-4 border-2 border-white dark:border-gray-700 shadow rounded-full w-10 h-10">
                    <img
                      className="w-full h-full overflow-hidden object-cover rounded-full"
                      src="https://dh-ui.s3.amazonaws.com/assets/webapp/layout/grid_cards/grid_card12.jpg"
                      alt="avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Card code block end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
