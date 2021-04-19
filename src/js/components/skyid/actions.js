import buildSkyid from "./skyid";

export function getData(filename, setDataFunc) {
    let skyid = buildSkyid();
    skyid.getFile(filename, function (response, revision) {
        if (response === "") {
            // file not found
            console.log("NO FILE");
        } else {
            // success
            console.log("FILE FOUND");
            console.log(response);
            setDataFunc(response)
        }   
    })
}


export function setData(filename, data) {
    let skyid = buildSkyid();
    // let data = { test: "tested" };
    let jsonData = JSON.stringify(data);
    console.log("Adding Data");
    return skyid.setJSON(filename, jsonData, function (response) {
        if (response !== true) {
          alert("Sorry, skyid.setFile failed :(");
        }
        console.log(response);
        return response
      });
  };