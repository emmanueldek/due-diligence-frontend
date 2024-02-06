import { Outlet } from "react-router-dom";

const WorkspaceLayout = () => {
  return (
    <div>
      <div className="w-[90%] max-w-[570px] mx-auto">
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLayout;
