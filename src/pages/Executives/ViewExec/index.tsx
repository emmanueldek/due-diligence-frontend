import React, { useState, useEffect } from "react";
import { Wrapper } from "@/components";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import ProgressBar from "@/components/ProgressBar";
import Records from "./records";
import { Circles } from "react-loader-spinner";
import { getSingleExec } from "@/services/executiveService";
import { IExecutiveProps } from "@/interface/executiveTypes";
import Activities from "./activities";

const ExecInfo: React.FC = () => {
  const navigate = useNavigate();
  const [dataExec, setDataExec] = useState<IExecutiveProps>();
  const { id } = useParams();
  const requestId = id || "default";

  function formatDateString(inputDate: string) {
    const dateObject = new Date(inputDate);
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const { data: execData, isLoading } = useQuery(["execData"], () => getSingleExec(requestId));

  useEffect(() => {
    setDataExec(execData?.data as IExecutiveProps);
  }, [execData?.data]);

  const [step, setStep] = useState<number>(0);
  const tabs = [
    { name: "Records", value: 0 },
    { name: "Activities", value: 1 },
  ];

  console.log(dataExec);

  const displaySteps = () => {
    switch (step) {
      case 0:
        return <Records data={dataExec} />;
      case 1:
        return <Activities />;
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

        {isLoading ? (
          <div className="w-full flex items-center justify-center h-[screen]">
            <Circles color="#191a1b" width={30} />
          </div>
        ) : (
          <>
            <Wrapper className="shadow-md px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  {dataExec?.theExecutive?.profile?.executiveAvatar ? (
                    <div className="rounded-lg overflow-hidden w-[72px] h-[72px] mt-3">
                      <img
                        src={dataExec?.theExecutive?.profile?.executiveAvatar}
                        alt=""
                        className="object-cover w-[72px] h-[72px]"
                      />
                    </div>
                  ) : (
                    <div className="rounded-lg overflow-hidden w-[72px] h-[72px] mt-3 text-[700] flex justify-center items-center bg-[#f59e0b] text-4xl text-white">
                      {dataExec?.theExecutive?.profile?.executiveName?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-[700] text-2xl">{dataExec?.theExecutive?.profile?.executiveName}</p>
                    {/* <p>
                  {state.position} {state.organisation}
                </p> */}
                  </div>
                </div>
              </div>
              <div className="flex space-x-5">
                <div>
                  <p className="font-[600] text-xs">Date created</p>
                  <p>{formatDateString(dataExec?.theExecutive?.createdAt || "")}</p>
                </div>
                <div>
                  <p className="font-[600] text-xs">Last Modified</p>
                  <p>{formatDateString(dataExec?.theExecutive?.updatedAt || "")}</p>
                </div>
                <div>
                  <p className="font-[600] text-xs">Profile Completed</p>
                  <span className="flex items-center space-x-2">
                    <ProgressBar percent={dataExec?.completionpercentage} />
                    <p>{dataExec?.completionpercentage}%</p>
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
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default ExecInfo;
