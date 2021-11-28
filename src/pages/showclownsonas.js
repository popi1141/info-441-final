import React from "react";
import Meta from "components/Meta";
import ClownsonaSection from "components/ClownsonaSection";
import { requireAuth } from "util/auth";
import { useAuth } from "util/auth";
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

function ClownsonaPage() {
  const auth = useAuth();
  var currentUser = auth.user;
  const url = "/api/getsonanumber?uid="+currentUser.id;

  const { data, error } = useSWR(
    url,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return <div>loading...</div>
  return (
    <>
      <Meta title="Clownsonas" />
      <ClownsonaSection data={data}/> 
    </>
  );
}

export default requireAuth(ClownsonaPage);
