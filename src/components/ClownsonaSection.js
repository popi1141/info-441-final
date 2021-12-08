import React from "react";
import Link from "next/link";

function ClownsonaSection({data}) {
  return (
    <div>
      <h1>Display Clownsonas</h1>
      <h2> This is your current clownsona, {data.name}. Your clownsona is clownsona {data.number}! </h2> 
      <h3> Change your clownsona by going <Link href="/settings/clownsona" passHref={true}> here </Link> </h3>
      {(data.number === "1") && <img className={"logoPic"} src="/clownsonas/clown1.svg" alt="work pls" />}
      {(data.number === "2") && <img className={"logoPic"} src="/clownsonas/clown3.svg" alt="Logo" />}
      {(data.number === "3") && <img className={"logoPic"} src="/clownsonas/clown3.svg" alt="Logo" />}
      {(data.number === "4") && <img className={"logoPic"} src="/clownsonas/clown4.svg" alt="Logo" />}
      {(data.number === "5") && <img className={"logoPic"} src="/clownsonas/clown5.svg" alt="Logo" />}
  </div>
  );
}

export default ClownsonaSection;
