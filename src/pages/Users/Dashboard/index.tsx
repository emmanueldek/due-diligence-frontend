import { useState, useEffect } from "react";
import { Wrapper } from "@/components";
import DashCard from "@/components/card/dashcard";
import { Edit } from "@/components/svgs/Edit";
import { Organisation } from "@/components/svgs/Organisation";
import { People } from "@/components/svgs/People";
import Drafts from "./drafts";
import Organisations from "./organisations";
import Executives from "./executives";
import CountCard from "@/components/card/CountCard";
import { useQuery } from "@tanstack/react-query";
import { getSingleWorkspace } from "@/services/workspaceService";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

interface IStatProps {
  totalExecutivesCreated: number | string;
  totalNumDrafts: number | string;
  totalOrganizationsCreated: number | string;
}

interface ISingleUserProps {
  avatar: string;
  firstName: string;
  lastName: string;
  dateJoined: string;
  createdAt: string;
  email: string;
  role: string;
  status: string;
}

function formatDateString(inputDate: string) {
  const dateObject = new Date(inputDate);
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const year = dateObject.getFullYear();
  return `${month}/${day}/${year}`;
}

function SettingDashboard() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);
  const [statData, setStatData] = useState<IStatProps>();
  const [singleData, setSingleData] = useState<ISingleUserProps>();
  const { id } = useParams();
  const userId = id || "";

  const { data: singleUser } = useQuery(["singleUser", userId], () => getSingleWorkspace(userId));
  useEffect(() => {
    setSingleData(singleUser?.data?.theUser);
    setStatData(singleUser?.data);
    console.log(singleUser?.data);
  }, [singleUser?.data, singleUser?.data?.theUser]);

  const tabs = [
    { name: "Drafts", value: 0 },
    { name: "Active Organisation", value: 1 },
    { name: "Active Executives", value: 2 },
  ];

  const displaySteps = () => {
    switch (step) {
      case 0:
        return <Drafts />;
      case 1:
        return <Organisations />;
      case 2:
        return <Executives />;
      default:
    }
  };

  const handleClick = (e: number) => {
    setStep(e);
  };
  return (
    <div>
      <p className="my-2 cursor-pointer flex items-center space-x-1" onClick={() => navigate(-1)}>
        <IoIosArrowRoundBack />
        Back
      </p>
      <Wrapper className="bg-white mb-5 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            {singleData?.avatar ? (
              <div className="rounded-lg overflow-hidden w-[72px] h-[72px] mt-3">
                <img src={singleData?.avatar} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden w-[72px] h-[72px] mt-3 text-[700] flex justify-center items-center bg-[#f59e0b] text-4xl text-white">
                {singleData?.email?.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-[700] text-2xl flex items-baseline">
                {singleData?.firstName} {singleData?.lastName}{" "}
                <ul className="text-sm pl-7 text-grey-200 list-disc">
                  <li>{singleData?.role}</li>
                </ul>
              </p>
              <p className="text-grey-200 flex items-baseline">
                joined {formatDateString(singleData?.dateJoined || "")}{" "}
                <ul className="list-disc pl-7">
                  <li>{singleData?.email}</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
      <div className="flex space-x-5">
        {/* {data.map((item, i) => (
          <div key={i}>
            <DashCard title={item.title} value={item.value} icon={item.icon} />
          </div>
        ))} */}
        <div>
          <DashCard title={"No. of Drafts"} value={statData ? statData?.totalNumDrafts : ""} icon={<Edit />} />
        </div>
        <div>
          <DashCard
            title={"Organisations Created"}
            value={statData ? statData?.totalOrganizationsCreated : ""}
            icon={<Organisation />}
          />
        </div>
        <div>
          <DashCard
            title={"Executives Created"}
            value={statData ? statData?.totalExecutivesCreated : ""}
            icon={<People />}
          />
        </div>
      </div>
      <Wrapper className="bg-white mt-5">
        <div>
          <div className="space-x-10 flex border-b-2 border-grey-100">
            {tabs.map((item) => (
              <div
                key={item.value}
                className={`cursor-pointer ${
                  step === item.value
                    ? "border-b-[2px] text-[#0F172A] text-lg pb-2 font-semibold"
                    : "text-grey-300 pb-2"
                }`}
                onClick={() => handleClick(item.value)}
              >
                <div className="flex space-x-1 items-center">
                  <p>{item.name}</p>
                  {item.name === "Drafts" ? (
                    <div>
                      <CountCard count={statData?.totalNumDrafts || ""} active={step === 0 && true} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">{displaySteps()}</div>
        </div>
      </Wrapper>
    </div>
  );
}

export default SettingDashboard;
