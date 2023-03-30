function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Jobs = () => {
  const timeline = [
    {
      id: 1,

      content: "Applied to",
      target: "Front End Developer",
      date: "Sep 20",
      datetime: "2020-09-20",
    },
    {
      id: 2,

      content: "Advanced to phone screening by",
      target: "Bethany Blake",
      date: "Sep 22",
      datetime: "2020-09-22",
    },
    {
      id: 3,

      content: "Completed phone screening with",
      target: "Martha Gardner",
      date: "Sep 28",
      datetime: "2020-09-28",
    },
    {
      id: 4,

      content: "Advanced to interview by",
      target: "Bethany Blake",
      date: "Sep 30",
      datetime: "2020-09-30",
    },
    {
      id: 5,

      content: "Completed interview with",
      target: "Katherine Snyder",
      date: "Oct 4",
      datetime: "2020-10-04",
    },
  ];
  return (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-start-3 lg:col-span-1"
    >
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          Timeline
        </h2>

        {/* Activity Feed */}
        <div className="mt-6 flow-root">
          <ul role="list" className="-mb-8">
            {timeline.map((item, itemIdx) => (
              <li key={item.id}>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div></div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {item.content}{" "}
                          <a href="#" className="font-medium text-gray-900">
                            {item.target}
                          </a>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={item.datetime}>{item.date}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-col justify-stretch">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Advance to offer
          </button>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
