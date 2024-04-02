import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import Finance from "./Finance";
import Tax from "./Tax";
import Legal from "./Legal";
// import Insurance from "./Insurance";
import Reference from "./Reference";
import { IDataProps } from "@/interface/userCreation";
import Management from "./Management";
import OwnershipStructure from "./OwnershipStructure";
import CreditHistory from "./CreditHistory";
import { getSingleOrg } from "@/services/organisationService";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const NewOrganisation: React.FC = () => {
  const { state } = useLocation();
  const [step, setStep] = useState<number>(0);

  const initialData: IDataProps = {
    profile: {},
    insurance: [],
    creditHistory: [],
    tax: [],
    legal: [],
    contract: [],
    reference: [],
    financial: [],
    management: [],
    creditRating: [],
    supplyChainInfo: [],
    ownershipStructure: {},
    creditReport: [],
  };

  const [execDocId, setExecDocId] = useState("");
  const { id } = useParams();
  const requestId = id || "undefined";
  const sugDocId = state ? state.sug : "";
  const recDocId = state ? state.rec : "";

  console.log({ sugDocId, recDocId });

  const { data: getData } = useQuery(["singleRequest"], () => {
    if (requestId) {
      return getSingleOrg(requestId);
    }
    return null;
  });
  console.log(getData);
  useEffect(() => {
    if (getData?.data && Object.keys(getData.data).length > 0) {
      setExecDocId(getData?.data?.theOrganization?.execOrgDocId);
    }
  }, [getData?.data]);

  const [data, setData] = useState<IDataProps>(initialData);
  const tabs = [
    { name: "Profile", value: 0 },
    { name: "Financial Statements", value: 1 },
    { name: "Management", value: 2 },
    { name: "Credit History", value: 3 },
    { name: "Tax Compliance", value: 4 },
    { name: "Legal", value: 5 },
    // { name: "Credit Rating", value: 6 },
    // { name: "Contractual Obligations", value: 7 },
    // { name: "Insurance Coverage", value: 6 },
    // { name: "Supply Chain Information", value: 9 },
    { name: "References", value: 7 },
    { name: "Ownership Structure", value: 8 },
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
          <Management
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
          <CreditHistory
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
      case 5:
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
      // case 6:
      //   return (
      //     <CreditRating
      //       next={next}
      //       prev={prev}
      //       data={data}
      //       setData={setData}
      //       execDocID={execDocId}
      //       sugDocId={sugDocId}
      //       recDocId={recDocId}
      //     />
      //   );
      // case 7:
      //   return (
      //     <Obligation
      //       next={next}
      //       prev={prev}
      //       data={data}
      //       setData={setData}
      //       execDocID={execDocId}
      //       sugDocId={sugDocId}
      //       recDocId={recDocId}
      //     />
      //   );
      // case 6:
      //   return (
      //     <Insurance
      //       next={next}
      //       prev={prev}
      //       data={data}
      //       setData={setData}
      //       execDocID={execDocId}
      //       sugDocId={sugDocId}
      //       recDocId={recDocId}
      //     />
      //   );
      // case 9:
      //   return (
      //     <SupplyChainInfo
      //       next={next}
      //       prev={prev}
      //       data={data}
      //       setData={setData}
      //       execDocID={execDocId}
      //       sugDocId={sugDocId}
      //       recDocId={recDocId}
      //     />
      //   );
      case 7:
        return (
          <Reference
            next={next}
            prev={prev}
            data={data}
            setData={setData}
            execDocID={execDocId}
            sugDocId={sugDocId}
            recDocId={recDocId}
          />
        );
      case 8:
        return (
          <OwnershipStructure
            next={next}
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
          <p className="font-[700] text-xl px-5">Create Organization</p>
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

export default NewOrganisation;
