import Drafts from "./drafts";
import Requests from "./requests";
import Home from "./home";
import { Route, Routes } from "react-router-dom";
import SuggestionView from "./requests/exSuggestions/suggestionView";
import RecordView from "./requests/exAddRecord/recordView";
import ExecutiveView from "./home/viewExec";
import NewExec from "./newExec";
import ExecProfileRequest from "./requests/exNewProfile/ViewProfile";
import CreateExec from "./newExec/CreateExec";
import ExecInfo from "./ViewExec";

const Executives = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/draft" element={<Drafts />} />
      <Route path="/request" element={<Requests />} />
      <Route path="/request/profile/:id" element={<ExecProfileRequest />} />
      <Route path="/request/suggestion/:id" element={<SuggestionView />} />
      <Route path="/request/record/:id" element={<RecordView />} />
      <Route path="/profile/:id" element={<ExecutiveView />} />
      <Route path="/draft-profile/:id" element={<ExecutiveView />} />
      <Route path="/create" element={<CreateExec />} />
      <Route path="/create/:id" element={<NewExec />} />
      <Route path="/view/:id" element={<ExecInfo />} />
    </Routes>
  );
};

export default Executives;
