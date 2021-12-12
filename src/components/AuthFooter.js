import React from "react";
import Link from "next/link";

function AuthFooter(props) {
  return (
    <div className="AuthFooter text-center text-secondary mt-4 px-2">
      {props.type === "signup" && (
        <>
          {props.signinText}
          <Link href={props.signinPath}>
            <a className="ml-2">{props.signinAction}</a>
          </Link>
        </>
      )}

      {props.type === "signin" && (
        <>
          <Link href={props.signupPath}>
            <a>{props.signupAction}</a>
          </Link>

          {props.forgotPassAction && (
            <Link href={props.forgotPassPath}>
              <a className="ml-3">{props.forgotPassAction}</a>
            </Link>
          )}
        </>
      )}

      {props.type === "forgotpass" && (
        <>
          {props.signinText}
          <Link href={props.signinPath}>
            <a className="ml-2">{props.signinAction}</a>
          </Link>
        </>
      )}
    </div>
  );
}

export default AuthFooter;
