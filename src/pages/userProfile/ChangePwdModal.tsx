import { SetStateAction } from "react";
import { InputPassword, PrimaryBtn, TransparentBtn } from "@/components";
import Modal from "@/components/modal";

interface IChangePwdModal {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

function ChangePwdModal({ setOpenModal }: IChangePwdModal) {
  return (
    <Modal
      onClose={() => setOpenModal(false)}
      title="Change Password"
      subtitle="Create a new password to secure your account."
      className="w-[40%]"
    >
      <div className="w-full pt-7">
        <InputPassword
          id={"current_password"}
          isRequired={true}
          name={"current_password"}
          placeholder={"current_password"}
          label={"Current Password"}
        />

        <InputPassword
          id={"new_password"}
          isRequired={true}
          name={"new_password"}
          placeholder={"new_password"}
          label={"New Password"}
        />

        <div className="flex justify-between md:justify-end items-center pt-6">
          <div className="flex">
            <TransparentBtn className="md:ml-4 mr-2" text="Cancel" onClick={() => setOpenModal(false)} />
            <PrimaryBtn text="Reset password" />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ChangePwdModal;
