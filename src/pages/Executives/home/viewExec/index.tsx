import React, { useState } from "react";
import { Wrapper } from "@/components";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import ProgressBar from "@/components/ProgressBar";
import EditTrail from "./editTrail";
import Records from "./records";

const ExecutiveView: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const [step, setStep] = useState<number>(0);
  const tabs = [
    { name: "Records", value: 0 },
    { name: "Edit Trail", value: 1 },
  ];

  const displaySteps = () => {
    switch (step) {
      case 0:
        return <Records />;
      case 1:
        return <EditTrail />;
      default:
    }
  };

  const handleClick = (e: number) => {
    setStep(e);
  };
  return (
    <div>
      <Wrapper className="bg-white px-10 py-10">
        <p className="pt-2 cursor-pointer flex items-center space-x-1" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack />
          Back
        </p>

        <Wrapper className="shadow-md px-5">
          {/* <p className="font-[600]">Requested by</p> */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              {state.img ? (
                <div className="rounded-lg overflow-hidden w-[72px] h-[72px] mt-3">
                  <img src={state.img} alt="" />
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden w-[72px] h-[72px] mt-3 text-[700] flex justify-center items-center bg-[#f59e0b] text-4xl text-white">
                  {state.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-[700] text-2xl">{state.name}</p>
                <p>
                  {state.position} {state.organisation}
                </p>
              </div>
            </div>
            <p className="text-[#2F80ED] font-[600]">View Profile</p>
          </div>
          <div className="flex space-x-5">
            <div>
              <p className="font-[600] text-xs">Date created</p>
              <p>{state.createdAt}</p>
            </div>
            <div>
              <p className="font-[600] text-xs">Last Modified</p>
              <p>{state.updatedAt}</p>
            </div>
            <div>
              <p className="font-[600] text-xs">Profile Completed</p>
              <span className="flex items-center space-x-2">
                <ProgressBar percent={state.percentageCompleted} />
                <p>{state.percentageCompleted}</p>
              </span>
            </div>
          </div>
        </Wrapper>

        <Wrapper className="px-10 shadow-md mt-10">
          <div className="space-x-10 flex border-b border-grey-100">
            {tabs.map((item) => (
              <span
                key={item.value}
                className={`cursor-pointer ${
                  step === item.value
                    ? "border-b-[2px] text-[#0F172A] text-lg font-semibold pb-2"
                    : "text-grey-300 pb-2"
                }`}
                onClick={() => handleClick(item.value)}
              >
                <p>{item.name}</p>
              </span>
            ))}
          </div>
          <div>{displaySteps()}</div>
        </Wrapper>
      </Wrapper>
    </div>
  );
};

export default ExecutiveView;
