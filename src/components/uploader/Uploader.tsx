import React from "react";
import { InputFile } from "..";
import { ProgressBar } from "react-loader-spinner";
import { useMutation } from "@tanstack/react-query";
import { useUploadImage } from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { IoDocumentAttach } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";

type IUploaderProps = {
  file: string;
  setFile: (data: string) => void;
};

const Uploader: React.FC<IUploaderProps> = ({ file, setFile }) => {
  const { mutate: uploadCAC, isLoading: progressLoading } = useMutation(useUploadImage, {
    onSuccess: ({ data: uploadRes }) => {
      setFile(uploadRes?.url);
      Toast.success("File uploaded successfully");
    },

    onError: (error) => {
      Toast.error("something went wrong");
      console.log(error);
    },
  });

  const handleCACFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (!e.target.files || e.target.files.length === 0) {
      Toast.error("Please select only one file");
      return;
    } else {
      const imageFile = new FormData();
      imageFile.append("file", e.target.files[0]);
      uploadCAC({ imageFile, flags: "organizationProfiles" });
    }
  };
  return (
    <div>
      <p className="text-sm mb-2 font-medium">Upload CAC document</p>
      <div className="mb-6">
        <InputFile onChange={(e) => handleCACFileUpload(e)} />
        {progressLoading && (
          <div>
            <ProgressBar height={30} width={""} borderColor="#000000" barColor="#008000" />
          </div>
        )}
      </div>
      <div className="flex items-center space-x-3">
        {file && (
          <div>
            <div className="flex items-center space-x-3">
              <div className="bg-grey-100 rounded w-[100px] h-[128px] flex items-center justify-center">
                <IoDocumentAttach size={50} color="#808080" />
              </div>
              <div
                className="rounded-full flex items-center justify-center bg-red-500 w-[20px] h-[20px] active:bg-red-800 cursor-pointer"
                onClick={() => setFile("")}
              >
                <RiDeleteBin5Fill size={10} color="#ffffff" />
              </div>
            </div>
            <p className="text-xs text-green-600 my-2">{file.slice(81)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
