import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
    steps: { id: number; name: string }[];
    currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
    return (
        <div className="w-full py-4">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10" />
                <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 -z-10 transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;

                    return (
                        <div key={step.id} className="flex flex-col items-center bg-white px-2">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                                    isCompleted ? "bg-blue-600 border-blue-600 text-white" :
                                        isCurrent ? "bg-white border-blue-600 text-blue-600" :
                                            "bg-white border-slate-300 text-slate-300"
                                )}
                            >
                                {isCompleted ? <Check className="h-4 w-4" /> : <span>{step.id}</span>}
                            </div>
                            <span className={cn(
                                "text-xs font-medium mt-2 absolute top-8 w-32 text-center",
                                isCurrent ? "text-blue-600" : "text-slate-500"
                            )}>
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
