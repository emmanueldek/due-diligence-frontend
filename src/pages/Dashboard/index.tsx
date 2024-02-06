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
import { getDashboardStats } from "@/services/dashboardService";

interface IStatProps {
  drafts: string;
  organizations: string;
  executives: string;
}

function Dashboard() {
  const [step, setStep] = useState<number>(0);
  const [statData, setStatData] = useState<IStatProps>();

  const { data } = useQuery(["stats"], getDashboardStats);
  useEffect(() => {
    setStatData(data?.data);
    console.log(data?.data);
  }, [data?.data]);

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
      <div className="flex space-x-5">
        {/* {data.map((item, i) => (
          <div key={i}>
            <DashCard title={item.title} value={item.value} icon={item.icon} />
          </div>
        ))} */}
        <div>
          <DashCard title={"No. of Drafts"} value={statData?.drafts || "0"} icon={<Edit />} />
        </div>
        <div>
          <DashCard title={"Organisations Created"} value={statData?.organizations || "0"} icon={<Organisation />} />
        </div>
        <div>
          <DashCard title={"Executives Created"} value={statData?.executives || "0"} icon={<People />} />
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
                      <CountCard count={statData?.drafts || ""} active={step === 0 && true} />
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

export default Dashboard;
