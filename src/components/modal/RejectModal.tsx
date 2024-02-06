import React, { useState } from "react";
import Modal from "../modal";
import { SelectInput, TextArea } from "..";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineRequest } from "@/services/executiveService";
// import { useNavigate } from "react-router-dom";
import { Toast } from "@/config/toast";

interface IDeleteProps {
  title: string;
  body: string;
  onClose: () => void;
  buttonTitle: string;
  requestId: string;
  flag: string;
  queryKey?: string;
}

const RejectModal: React.FC<IDeleteProps> = ({ title, body, onClose, buttonTitle, requestId, flag, queryKey }) => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [clickInput, setClickedInput] = useState("select");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [clickError, setClickError] = useState("Select an option");
  const handleClick = () => {
    setOpen(!open);
  };

  console.log(requestId);

  const { mutate: decline, isLoading: loadDecline } = useMutation(declineRequest, {
    onError: () => {
      Toast.error("Decline request failed");
    },
    onSuccess: () => {
      Toast.success("Request Declined");
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });
      onClose();
    },
  });

  const option = [
    { value: "Invalid", label: "Invalid" },
    { value: "Incomplete company name", label: "Incomplete company name" },
    { value: "custom", label: "Custom" },
    { value: "select", label: "select" },
  ];

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "select") {
      setClickError("");
      setClickedInput(e.target.value);
    }
  };
  console.log({ clickError });

  const handleSubmit = () => {
    if (clickInput === "custom" && text !== "") {
      const data = {
        requestId: requestId,
        flag,
        data: {
          reason: clickInput,
          description: text,
        },
      };
      decline(data);
      setOpen(false);
      !loadDecline && setOpen(false);
    } else if (clickInput === "select") {
      setError("select an option");
    } else if (clickInput !== "custom" && clickInput !== "select") {
      setOpen(false);
      const clickData = {
        requestId: requestId,
        flag,
        data: {
          reason: "default",
          description: clickInput,
        },
      };
      decline(clickData);
      !loadDecline && setOpen(false);
    } else {
      setError("please fill text field or choose from the option");
    }
  };
  return (
    <Modal title={title} onClose={onClose} className="w-[416px]">
      <div className="py-10">{body}</div>
      <hr className="border-grey-100" />
      <div className="pt-5 space-x-2 flex justify-end">
        <button
          onClick={onClose}
          className="px-3 py-2 active:bg-grey-100 active:border-none border rounded-lg border-1 "
        >
          cancel
        </button>
        <button
          className="px-3 py-2 active:bg-red-600 active:border-none border text-white bg-[#EC2727] rounded-lg border-1"
          onClick={handleClick}
        >
          {buttonTitle}
        </button>
      </div>
      {open && (
        <Modal
          title="Rejection Reason"
          subtitle="Why are you rejecting this suggestion?"
          onClose={handleClick}
          className="w-[479px]"
        >
          <div className="my-5">
            <div>
              <SelectInput
                id="reject"
                name="reject"
                label="Rejection Reason"
                options={option}
                onChange={(e) => handleSelect(e)}
                value={clickInput}
                defaultValue={clickInput}
              />
            </div>
            <div>
              {clickInput === "custom" && (
                <div className="mt-5">
                  <TextArea
                    label="Rejection Description"
                    isRequired={true}
                    id="reason"
                    name="reason"
                    error={error}
                    placeholder="Enter the reason for declining the request"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-2 active:bg-grey-100 active:border-none border rounded-lg border-1 "
            >
              cancel
            </button>
            <button
              className={`${
                clickError === "" ? "bg-[#EC2727] active:bg-red-600" : "bg-grey-300"
              } px-3 py-2  active:border-none border text-white  rounded-lg border-1`}
              onClick={handleSubmit}
            >
              {buttonTitle}
            </button>
          </div>
        </Modal>
      )}
    </Modal>
  );
};

export default RejectModal;
