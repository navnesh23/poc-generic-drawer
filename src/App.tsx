import React, { useState } from "react";
import SideDrawer from "./components/sideDrawer/SideDrawer";

const formConfig = {
  header: "User Details",
  fields: [
    {
      type: "input",
      label: "Name",
      name: "name",
      placeholder: "Enter your name",
    },
    {
      type: "input",
      label: "Mobile",
      name: "mobile",
      placeholder: "Enter your Mobile",
    },

    {
      type: "dropdown",
      label: "Gender",
      name: "gender",
      options: ["Male", "Female", "Other"],
    },
    { type: "datepicker", label: "Date of Birth", name: "dob" },
    {
      type: "radio",
      label: "Marital Status",
      name: "maritalStatus",
      options: ["Single", "Married"],
    },
    {
      type: "checkbox",
      label: "Hobbies",
      name: "hobbies",
      options: ["Reading", "Traveling", "Gaming"],
    },
    {
      type: "textarea",
      label: "Address",
      name: "address",
      placeholder: "Enter your address",
    },
  ],
  buttons: [
    { text: "Save", variant: "solid" as "solid" },
    { text: "Cancel", variant: "outlined" as "outlined" },
  ],
};

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setDrawerOpen(true)}>Open Drawer</button>
      <SideDrawer
        open={true}
        onClose={() => setDrawerOpen(false)}
        formConfig={formConfig}
      />
    </div>
  );
};

export default App;
