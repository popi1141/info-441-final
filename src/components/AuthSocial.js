import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "util/auth";

function AuthSocial(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(null);

  const providerDisplayNames = {
    google: "Google",
  };

  const onSigninWithProvider = (provider) => {
    setPending(provider);
    auth
      .signinWithProvider(provider)
      .then((user) => {
        props.onAuth(user);
      })
      .catch((error) => {
        setPending(null);
        props.onError(error.message);
      });
  };

  return (
    <>
      {props.providers.map((provider) => (
        <Button
          variant="light"
          size="lg"
          block={true}
          onClick={() => {
            onSigninWithProvider(provider);
          }}
          className="position-relative"
          key={provider}
        >
          <div className="AuthSocial__icon">
            <img
              src={`https://freesvg.org/img/1534129544.png`}
              alt={providerDisplayNames[provider]}
            />
          </div>

          {pending !== provider && (
            <span>
              {props.buttonAction} with {providerDisplayNames[provider]}
            </span>
          )}

          {pending === provider && (
            <Spinner
              animation="border"
              size="sm"
              role="status"
              aria-hidden={true}
              className="align-baseline text-primary"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </Button>
      ))}
    </>
  );
}

export default AuthSocial;
