import { useEffect, useState } from "react";
import MyContract from "./MyContract";
import NextHoliday from "./NextHoliday";
import Profile from "./Profile";

const Container = () => {
  const steps = [
    { id: "01", name: "My Profile" },
    { id: "02", name: "My Contract" },
    { id: "03", name: "My Holidays" },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    stepIdx: number
  ) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "LI") {
      return;
    }

    target.classList.add("bg-black");

    const circle = target.childNodes[0].childNodes[0] as HTMLElement;
    circle.classList.add("border-white");
    circle.classList.add("text-white");
    const title = target.childNodes[0].childNodes[1] as HTMLElement;
    title.classList.add("text-white");

    const prevStep = steps[activeStep];
    if (prevStep && prevStep.id !== steps[stepIdx].id) {
      const prevStepElement = document.getElementById(`step-${prevStep.id}`);
      prevStepElement?.classList.remove("bg-black");

      const prevCircle = prevStepElement?.childNodes[0]
        .childNodes[0] as HTMLElement;
      prevCircle?.classList.remove("border-white");
      prevCircle?.classList.remove("text-white");
      const prevTitle = prevStepElement?.childNodes[0]
        .childNodes[1] as HTMLElement;
      prevTitle?.classList.remove("text-white");
    }

    setActiveStep(stepIdx);
  };

  const selectedStep = steps[activeStep].name;
  let componentToRender;

  if (selectedStep === "My Profile") {
    componentToRender = <Profile />;
  } else if (selectedStep === "My Contract") {
    componentToRender = <MyContract />;
  } else if (selectedStep === "My Holidays") {
    componentToRender = <NextHoliday />;
  }

  useEffect(() => {
    const myProfileLi = document.getElementById("step-01");
    if (myProfileLi) {
      myProfileLi.click();
    }
  }, []);
  return (
    <>
      <nav className="p-4" aria-label="Progress">
        <ol
          role="list"
          className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              id={`step-${step.id}`}
              className="steps relative md:flex-1 md:flex cursor-pointer"
              onClick={(e) => handleClick(e, stepIdx)}
            >
              {
                <a
                  className={`px-6 py-4 flex items-center text-sm font-medium ${
                    stepIdx === activeStep ? "bg-black" : ""
                  }`}
                  aria-current="step"
                >
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 rounded-full">
                    <span className="">{step.id}</span>
                  </span>
                  <span
                    className="ml-4 text-sm font-medium"
                    style={{ color: stepIdx === activeStep ? "white" : "" }}
                  >
                    {step.name}
                  </span>
                </a>
              }

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="hidden  md:block absolute top-0 right-0 h-full w-5"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex justify-center mt-8">{componentToRender}</div>
    </>
  );
};

export default Container;
