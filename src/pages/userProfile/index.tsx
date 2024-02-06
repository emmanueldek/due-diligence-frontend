import { useState } from "react";
import { Wrapper } from "@/components";
import Profile from "./Profile";
import ChangePwdModal from "./ChangePwdModal";

function UserProfile() {
  const [tab] = useState("Profile");
  const [openModal, setOpenModal] = useState(false);

  return (
    <main className="flex flex-wrap items-start gap-4">
      <Wrapper className="bg-white w-full max-w-[700px] px-0">
        {tab === "Profile" && <Profile />}
        {/* {tab === "Notifications" && <Notifications />} */}
      </Wrapper>

      {openModal && <ChangePwdModal setOpenModal={setOpenModal} />}
    </main>
  );
}

export default UserProfile;
