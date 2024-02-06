import { useState } from "react";
import Pending from "./Pending";
import Declined from "./Declined";
import CountCard from "@/components/card/CountCard";

// interface ISearchValueProps {
// }

interface IProfileProps {
  pending: string | undefined;
  declined: string | undefined;
  searchValue: string | undefined;
}

const NewProfile = ({ searchValue, pending, declined }: IProfileProps) => {
  const [step, setStep] = useState<number>(0);
  const tabs = [
    { name: "Pending", value: 0 },
    { name: "Declined", value: 1 },
  ];

  const displaySteps = () => {
    switch (step) {
      case 0:
        return <Pending searchValue={searchValue} />;
      case 1:
        return <Declined searchValue={searchValue} />;
      default:
    }
  };

  const handleClick = (e: number) => {
    setStep(e);
  };
  return (
    <div>
      <div className="flex border-grey-100 relative">
        {tabs.map((item) => (
          <div
            key={item.value}
            className={`cursor-pointer  top-[-3rem] p-3 ${
              step === item.value ? "text-[#0F172A] text-lg p-3 rounded bg-grey-100 font-semibold" : "text-grey-300"
            }`}
            onClick={() => handleClick(item.value)}
          >
            <div className="flex space-x-1 items-center">
              <p>{item.name}</p>
              <div>
                <CountCard
                  count={item.name === "Pending" ? pending || "" : declined || ""}
                  active={step === item.value ? true : false}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-3">{displaySteps()}</div>
    </div>
  );
};

export default NewProfile;
