import React from "react";
import Modal from "../modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "@/services/dashboardService";
import { Toast } from "@/config/toast";
import { ClipLoader } from "react-spinners";
import { deleteProfile } from "@/services/organisationService";
// import { useNavigate } from "react-router-dom";

interface IDeleteProps {
  title: string;
  body: string;
  onClose: () => void;
  id?: string;
  flag?: string;
  queryKey?: string;
  name?: string;
}

interface IDeleteData {
  executiveIds?: string[];
  organizationIds?: string[];
}

const DeleteModal: React.FC<IDeleteProps> = ({ title, body, onClose, id, flag, queryKey, name }) => {
  // const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteRequest, {
    onSuccess: () => {
      Toast.success("Request deleted successfully");
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });
      onClose();
    },
    onError: (error) => {
      Toast.error(`${error}`);
    },
  });

  const { mutate: delProfile } = useMutation(deleteProfile, {
    onSuccess: () => {
      Toast.success(`Profile deleted successfully`);
      queryClient.invalidateQueries({ queryKey: [`${queryKey}`] });
      onClose();
    },
    onError: (error) => {
      Toast.error(`${error}`);
    },
  });

  const handleDelete = () => {
    if (flag === "declineRequest") {
      mutate(id || "");
    } else {
      const payload = {
        data: name === "org" ? { organizationIds: [id] } : { executiveIds: [id] },
        name,
        queryKey: queryKey,
      } as {
        data: IDeleteData;
        name: string;
        queryKey: string;
      };

      console.log(payload);

      delProfile(payload);
    }
  };

  return (
    <Modal title={title} onClose={onClose}>
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
          onClick={handleDelete}
        >
          {isLoading ? <ClipLoader size={20} color="#ffffff" /> : title}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
