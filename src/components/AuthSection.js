import React from "react";
import Container from "react-bootstrap/Container";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Auth from "components/Auth";
import AuthFooter from "components/AuthFooter";

function AuthSection(props) {
  const optionsByType = {
    signup: {
      title: "Join the Clowntown",
      buttonAction: "Sign up",
      showFooter: true,
      signinText: "Already have an account?",
      signinAction: "Sign in",
      signinPath: "/auth/signin",
    },
    signin: {
      title: "Welcome Back Fellow Clown!",
      buttonAction: "Sign in",
      showFooter: true,
      signupAction: "Create an account",
      signupPath: "/auth/signup",
      forgotPassAction: "Forgot Password?",
      forgotPassPath: "/auth/forgotpass",
    },
    forgotpass: {
      title: "Remember the Clownery",
      buttonAction: "Reset password",
      showFooter: true,
      signinText: "Remember it after all?",
      signinAction: "Sign in",
      signinPath: "/auth/signin",
    },
    changepass: {
      title: "Choose a new password",
      buttonAction: "Change password",
    },
  };

  const type = optionsByType[props.type] ? props.type : "signup";
  const options = optionsByType[type];

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container
        style={{
          maxWidth: "450px",
        }}
      >
        <SectionHeader
          title={options.title}
          subtitle=""
          size={2}
          spaced={true}
          className="text-center"
        />
        <Auth
          type={type}
          buttonAction={options.buttonAction}
          providers={props.providers}
          afterAuthPath={props.afterAuthPath}
          key={type}
        />

        {options.showFooter && <AuthFooter type={type} {...options} />}
      </Container>
    </Section>
  );
}

export default AuthSection;
