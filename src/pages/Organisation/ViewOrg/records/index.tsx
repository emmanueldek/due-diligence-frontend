import React, { useState } from "react";
import Profile from "./Profile";
import Financial from "./Financial";
import Tax from "./Tax";
import Legal from "./Legal";
import Credit from "./Credit";
import Obligation from "./Obligations";
import Insurance from "./Insurance";
import Reference from "./Reference";
import { IDataSetProps } from "@/interface/organisationTypes";
import Management from "./Management";
import OwnershipStructure from "./OwnershipStructure";

const Records: React.FC<IDataSetProps> = ({ data }) => {
  const [step, setStep] = useState<number>(0);
  const tabs = [
    { name: "Profile", value: 0 },
    { name: "Financial Statements", value: 1 },
    { name: "Managements", value: 2 },
    { name: "Credit History", value: 3 },
    { name: "Tax Compliance", value: 4 },
    { name: "Legal/ Regulatory", value: 5 },
    { name: "Insurance Coverage", value: 6 },
    { name: "References/ Reputation", value: 7 },
    { name: "Ownership Structure", value: 8 },
  ];

  console.log(data);
  const displaySteps = () => {
    switch (step) {
      case 0:
        return <Profile data={data?.theOrganization?.profile || {}} />;
      case 1:
        return <Financial data={data?.theOrganization?.financialStatements || []} />;
      case 2:
        return <Management data={data?.theOrganization?.management || []} />;
      case 3:
        return <Credit data={data?.theOrganization?.creditHistory || []} />;
      case 4:
        return <Tax data={data?.theOrganization?.taxCompliance || []} />;
      case 5:
        return <Legal data={data?.theOrganization?.legalRegulatory || []} />;
      case 6:
        return <Insurance data={data?.theOrganization?.insuranceCoverage || []} />;
      case 7:
        return <Reference data={data?.theOrganization?.referencesReputation || []} />;
      case 8:
        return <OwnershipStructure data={data?.theOrganization?.ownershipStructure} />;
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
