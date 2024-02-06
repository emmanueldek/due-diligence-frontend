import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import Finance from "./Finance";
import Tax from "./Tax";
import Legal from "./Legal";
import Credit from "./Credit";
import Obligation from "./Obligation";
import Insurance from "./Insurance";
import Reference from "./Reference";
import { IDataProps } from "@/interface/userCreation";
import { useQuery } from "@tanstack/react-query";
import { getSingleExec } from "@/services/executiveService";
import { useLocation, useParams } from "react-router-dom";

const Records: React.FC = () => {
  const { state } = useLocation();
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState<IDataProps>({
    profile: {},
    insurance: [],
    creditHistory: [],
    tax: [],
    legal: [],
    creditReport: [],
    contract: [],
    reference: [],
    financial: [],
  });

  const [execDocId, setExecDocId] = useState("");
  const { id } = useParams();
  const requestId = id || "undefined";
  const sugDocId = state ? state.sug : "";
  const recDocId = state ? state.rec : "";

  const { data: getData } = useQuery(["singleRequest"], () => {
    if (requestId) {
      return getSingleExec(requestId);
    }
    return null;
  });
  useEffect(() => {
    if (getData?.data && Object.keys(getData.data).length > 0) {
      setExecDocId(getData?.data?.theExecutive?.execOrgDocId);
    }
  }, [getData?.data]);

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

  const next = () => {
    step === 9 ? "" : setStep(step + 1);
  };
  const prev = () => {
    step === 0 ? "" : setStep(step - 1);
  };

  const displaySteps = () => {
    switch (step) {
      case 0:
        return (
          <Profile
            next={next}
            prev={prev}
            data={data}
            setData={setData}
            execDocID={execDocId}
            sugDocId={sugDocId}
            recDocId={recDocId}
          />
        );
      case 1:
        return (
          <Finance
            next={next}
            prev={prev}
            data={data}
            setData={setData}
            execDocID={execDocId}
            sugDocId={sugDocId}
            recDocId={recDocId}
          />
        );
      case 2:
        return (
          <Tax
            next={next}
            prev={prev}
            data={data}
            setData={setData}
            execDocID={execDocId}
            sugDocId={sugDocId}
            recDocId={recDocId}
          />
        );
      case 3:
        return (
          <Legal
            next={next}
            prev={prev}
            data={data}
            setData={setData}
            execDocID={execDocId}
            sugDocId={sugDocId}
            recDocId={recDocId}
          />
        );
      case 4:
        return (
          <Credit
            next={next}
            prev={prev}
            data={data}
            setData={setData}
            execDocID={execDocId}
            sugDocId={sugDocId}
            recDocId={recDocId}
          />
        );
      case 5:
        return (
          <Obligation
            next={next}
            prev={prev}
            data={data}
            setData={setData}
            execDocID={execDocId}
            sugDocId={sugDocId}
            recDocId={recDocId}
          />
        );
      case 6:
        return (
          <Insurance
            next={next}
            prev={prev}
            data={data}
            setData={setData}
            execDocID={execDocId}
            sugDocId={sugDocId}
            recDocId={recDocId}
          />
        );
      case 7:
        return (
          <Reference
            prev={prev}
            data={data}
            setData={setData}
            execDocID={execDocId}
            sugDocId={sugDocId}
            recDocId={recDocId}
          />
        );
      default:
    }
  };

  const handleClick = (e: number) => {
    setStep(e);
  };
  return (
    <div>
      <div className="my-3 flex space-x-5">
        <div className="space-y-3 py-5 w-[20%] h-fit bg-white rounded-xl">
          <p className="font-[700] text-xl px-5">Create Executive</p>
          <hr className="border-grey-100" />
          {tabs.map((item) => (
            <div
              key={item.value}
              className={`cursor-pointer ${
                step === item.value
                  ? "bg-grey-100 border-l-2 border-grey-900 text-grey-900 items-center py-2 flex font-semibold"
                  : "text-grey-300"
              } text-sm px-5 pt-2`}
              onClick={() => handleClick(item.value)}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div className="p-7 bg-white rounded-xl w-[70%]">{displaySteps()}</div>
      </div>
    </div>
  );
};

export default Records;
