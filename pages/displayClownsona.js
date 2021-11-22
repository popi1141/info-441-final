import React from "react";
import useAuth from "../utils/auth";
import {useFetchJSON} from "../hooks/useFetchJSON";


const App = () => {
  var currentUser = useAuth().user;
  var apiCallURL = "/api/getSonaNumber";
  if(currentUser)
  {
    apiCallURL = apiCallURL + "?user=" + encodeURIComponent(currentUser.displayName);
  }
  else{
    var currentUsername = undefined;
  }
  try{
    const [data, loadingData] = useFetchJSON(apiCallURL);
  }
  catch(error){
    let loadingData = false;
    apiCallURL = error;
  }
  if(!loadingData)
  {
    let currentSona = data.number;
  }
  return (
    <div>
      <h1>Display Clownsonas</h1>
      <h2><a href="/">Bottom text</a></h2>
      <h3>{apiCallURL}</h3>
      {currentUser && <h3>logged in</h3>}
      {(currentSona === 1) && <img className={"logoPic"} src="/clownsonas/clown1.svg" alt="work pls" />}
      {(currentSona === 3) && <img className={"logoPic"} src="/clownsonas/clown3.svg" alt="Logo" />}
      {(currentSona === 4) && <img className={"logoPic"} src="/clownsonas/clown4.svg" alt="Logo" />}
      {(currentSona === 5) && <img className={"logoPic"} src="/clownsonas/clown5.svg" alt="Logo" />}
      {loadingData && <h2>Getting the clownsona. . . </h2>}
    </div>
  );
};

export default App;
