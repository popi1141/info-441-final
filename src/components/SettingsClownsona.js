import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useForm } from "react-hook-form";
import { useAuth } from "util/auth";
import { updateUser } from "util/db";
import Link from "next/link";

function SettingsClownsona(props) {
  const auth = useAuth();
  const user = auth.user;
  const defaultType = auth.user.clownsona;
  const [pending, setPending] = useState(false);
  const [type, setType] = useState(defaultType);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = () => {
    setPending(true);
    let finalClownsona = {"clownsona" : type}
    return updateUser(user.uid, finalClownsona)
      .then(() => {
        // Set success status
        props.onStatus({
          type: "success",
          message: "Your clownsona has been updated",
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formClownsona">
        <Form.Label>Select Your Clownsona</Form.Label>
        <h3> Check your clownsona by going <Link href="/showclownsonas" passHref={true}> here </Link> </h3>
        <Form.Control
          as="select"
          name="clownsona"
          type="clownsona"
          placeholder="clownsona"
          label="clownsona"
          defaultValue={defaultType}
          onChange={e => {
            setType(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit" size="lg" disabled={pending}>
        <span>Save</span>
        {pending && (
          <Spinner
            animation="border"
            size="sm"
            role="status"
            aria-hidden={true}
            className="ml-2 align-baseline"
          >
            <span className="sr-only">Sending...</span>
          </Spinner>
        )}
      </Button>
    </Form>
  );
}

export default SettingsClownsona;
