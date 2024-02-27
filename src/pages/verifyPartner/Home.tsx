import { useEffect } from "react";
import { Circles } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyPartner } from "@/services/organisationService";

type TParams = {
  partnerId?: string | undefined;
};
const Home = () => {
  const params: TParams = useParams();
  console.log(params);

  const { mutate } = useMutation(verifyPartner, {
    onSuccess: (data) => {
      console.log(data);
      if (data.data.hasPassword) {
        window.open("https://diligence-records.vercel.app/auth/login", "_blank");
        console.log(data);
      } else {
        window.open(`https://records-admin.vercel.app/auth/create-new-password/${params.partnerId}`, "_blank");
        console.log("No password", data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    mutate(params.partnerId);
  }, []);

  return (
    <div className="flex w-full h-screen justify-center items-center flex-col gap-3">
      <Circles color="#00FFB1" />
      <p className="font-medium text-[#666666]">Verifying Email Address</p>
    </div>
  );
};

export default Home;
