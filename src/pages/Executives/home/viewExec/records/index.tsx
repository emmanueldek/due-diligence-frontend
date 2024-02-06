import React, { useState } from "react";
import Profile from "./Profile";
import Financial from "./Financial";
import Tax from "./Tax";
import Legal from "./Legal";
import Credit from "./Credit";
import Obligation from "./Obligations";
import Insurance from "./Insurance";
import Reference from "./Reference";

const Records: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const tabs = [
    { name: "Profile", value: 0 },
    { name: "Financial Statements", value: 1 },
    { name: "Tax Compliance", value: 2 },
    { name: "Legal/ Regulatory", value: 3 },
    { name: "Credit Reports", value: 4 },
    { name: "Contractual Obligations", value: 5 },
    { name: "Insurance Coverage", value: 6 },
    { name: "References/ Reputation", value: 7 },
  ];

  const displaySteps = () => {
    switch (step) {
      case 0:
        return <Profile />;
      case 1:
        return <Financial />;
      case 2:
        return <Tax />;
      case 3:
        return <Legal />;
      case 4:
        return <Credit />;
      case 5:
        return <Obligation />;
      case 6:
        return <Insurance />;
      case 7:
        return <Reference />;
      default:
    }
  };

  const handleClick = (e: number) => {
    setStep(e);
  };
  return (
    <div>
      <div className="my-10 flex space-x-5">
        <div className="space-y-4 py-5 w-[20%]">
          {tabs.map((item) => (
            <div
              key={item.value}
              className={`cursor-pointer ${
                step === item.value
                  ? "bg-grey-900 rounded-lg text-white items-center px-2 py-2 flex font-semibold"
                  : "text-grey-300"
              } text-sm `}
              onClick={() => handleClick(item.value)}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div className="p-5 border border-grey-100 rounded-xl w-full">{displaySteps()}</div>
      </div>
    </div>
  );
};

export default Records;
