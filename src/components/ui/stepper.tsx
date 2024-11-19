import clsx from "clsx";

interface StepperProps {
  steps: string[];
  currentStepIndex: number;
}

export default function Stepper({ steps, currentStepIndex }: StepperProps) {
  return (
    <nav aria-label="Progress" className="min-h-16 w-full">
      <ol role="list" className="z-10 flex items-center justify-between">
        {steps.map((step, stepIndex) => (
          <li key={step} className="flex flex-col items-center gap-1">
            <div
              className={clsx(
                "text-md flex size-10 items-center justify-center rounded-full font-medium",
                stepIndex === currentStepIndex
                  ? "bg-black text-white"
                  : "border-2 border-gray-300 bg-white text-gray-500",
              )}
            >
              {stepIndex + 1}
            </div>
            <span className="absolute mt-11 text-sm text-gray-500">{step}</span>
          </li>
        ))}
      </ol>
      <div className="-mt-5 h-0.5 w-full bg-gray-300"></div>
    </nav>
  );
}
