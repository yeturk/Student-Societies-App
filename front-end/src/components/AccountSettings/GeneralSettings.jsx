import React from "react";
import { Camera } from "lucide-react";
import Section from "./Section";
import FormGroup from "./FormGroup";
import Input from "./Input";
import { useAuth } from "../../context/AuthContext";

const GeneralSettings = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <Section>
      <FormGroup label="Name">
        <Input defaultValue={user?.name || "N/A"} />
      </FormGroup>

      <FormGroup label="E-mail">
        <Input
          type="email"
          defaultValue={user?.email || "N/A"}
          disabled
          className="account-settings-form-input opacity-75 cursor-not-allowed"
        />
      </FormGroup>

      <FormGroup label="Role">
        <Input
          defaultValue={user?.role || "N/A"}
          disabled
          className="account-settings-form-input opacity-75 cursor-not-allowed"
        />
      </FormGroup>
    </Section>
  );
};

export default GeneralSettings;
