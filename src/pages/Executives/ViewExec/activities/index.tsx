import { Wrapper } from "@/components";
import { useState } from "react";
import ActivityCard from "./ActivityCard";
import { useQuery } from "@tanstack/react-query";
import { TAuditSchema } from "@/interface/organisationTypes";
import { ExecAuditTrail } from "@/services/executiveService";

function Activities() {
  const [batch] = useState(1);
  const { data: auditTrail, isLoading } = useQuery(["requests-audit", batch], () => ExecAuditTrail(batch));
  console.log("audit", auditTrail?.data?.result);
  return (
    <main className="w-full">
      <Wrapper className="w-full bg-white px-0">
        <h1 className="text-xl font-bold leading-[2px] p-4">Activities</h1>

        <div className="mt-4">
          {isLoading
            ? [1, 2, 3, 4, 5].map((_, index: number) => (
                <div key={index} className="bg-grey-50 mx-auto h-20 mb-5 animate-pulse"></div>
              ))
            : auditTrail?.data?.result?.map((item: TAuditSchema) => <ActivityCard key={item?._id} activity={item} />)}
        </div>
      </Wrapper>
    </main>
  );
}

export default Activities;
