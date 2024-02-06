import Drafts from "./drafts";
import Requests from "./request";
import Home from "./home";
import { Route, Routes } from "react-router-dom";
import RecordViewOrg from "./request/addRecords/OrgAddRecords";
import ProfileRequest from "./request/newProfile/viewProfileOrg";
import SuggestionView from "./request/suggestions/OrgSuggestion";
import NewOrganisation from "./newOrg";
import OrganisationView from "./ViewOrg";
import CreateOrg from "./newOrg/CreateOrg";

const Organisation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/drafts" element={<Drafts />} />
      <Route path="/request" element={<Requests />} />
      <Route path="/request/record/:id" element={<RecordViewOrg />} />
      <Route path="/request/profile/:id" element={<ProfileRequest />} />
      <Route path="/request/suggestion/:id" element={<SuggestionView />} />
      <Route path="/view/:id" element={<OrganisationView />} />
      <Route path="/create/:id" element={<NewOrganisation />} />
      <Route path="/create" element={<CreateOrg />} />
    </Routes>
  );
};

export default Organisation;
