import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Section from "components/Section";
import ReauthModal from "components/ReauthModal";
import SettingsNav from "components/SettingsNav";
import FormAlert from "components/FormAlert";
import SettingsGeneral from "components/SettingsGeneral";
import SettingsPassword from "components/SettingsPassword";
import SettingsClownsona from "components/SettingsClownsona";
import { useAuth } from "util/auth";

function SettingsSection(props) {
  const auth = useAuth();
  const [formAlert, setFormAlert] = useState(null);

  const [reauthState, setReauthState] = useState({
    show: false,
  });

  const validSections = {
    general: true,
    password: true,
    clownsona: true
  };

  const section = validSections[props.section] ? props.section : "general";

  const handleStatus = ({ type, message, callback }) => {
    if (type === "requires-recent-login") {
      setFormAlert(null);
      setReauthState({
        show: true,
        callback: callback,
      });
    } else {
      setFormAlert({
        type: type,
        message: message,
      });
    }
  };

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      {reauthState.show && (
        <ReauthModal
          callback={reauthState.callback}
          provider={auth.user.providers[0]}
          onDone={() => setReauthState({ show: false })}
        />
      )}

      <SettingsNav activeKey={section} className="justify-content-center" />
      <Container
        className="mt-5"
        style={{
          maxWidth: "450px",
        }}
      >
        {formAlert && (
          <FormAlert
            type={formAlert.type}
            message={formAlert.message}
            className="mx-auto mb-4"
            style={{ maxWidth: "450px" }}
          />
        )}

        {section === "general" && <SettingsGeneral onStatus={handleStatus} />}
        {section === "password" && <SettingsPassword onStatus={handleStatus} />}
        {section === "clownsona" && <SettingsClownsona onStatus={handleStatus} />}
      </Container>
    </Section>
  );
}

export default SettingsSection;
