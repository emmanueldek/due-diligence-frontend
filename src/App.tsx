import { Routes, Route } from "react-router-dom";
import { appRoutes, authRoutes } from "./AppRoutes";
import { AuthLayout, PageLayout } from "./layout";
import ErrorPage from "./pages/error";
import VerifyInvite from "./pages/auth/VerifyInvite";
import Workspace from "./pages/auth/Workspace";
import WorkspaceLayout from "./layout/WorkspaceLayout";
import { VerifyPartner } from "./pages/verifyPartner";

function App() {
  return (
    <div className="font-primary">
      <Routes>
        <Route path="/auth" element={<AuthLayout />} errorElement={<ErrorPage />}>
          {authRoutes.map((appRoute, index) => {
            const { path, element } = appRoute;

            return <Route key={index} path={path} element={element} />;
          })}
        </Route>

        <Route path="/" element={<PageLayout />}>
          {appRoutes.map((appRoute, index) => {
            const { path, element } = appRoute;

            return <Route key={index} path={path} element={element} />;
          })}
        </Route>

        <Route element={<WorkspaceLayout />}>
          <Route path="/auth/workspace" element={<Workspace />} />
          <Route path="/workspace/invite/verify/:id" element={<VerifyInvite />} />
        </Route>
        <Route path="/verify/:partnerId" element={<VerifyPartner />} />
      </Routes>
    </div>
  );
}

export default App;
