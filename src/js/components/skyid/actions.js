import buildSkyID from "./skyid";

export function getData(filename, setDataFunc) {
    let skyid =  buildSkyID()
    return skyid.getFile(filename, function (response, revision) {
        if (response === "") {
            // file not found
            console.log("NO FILE");
            response = false;
        } else {
            // success
            console.log("FILE FOUND");
            console.log(revision);
            console.log(response);
            setDataFunc(response)
        }   
        return response
    })
}


export function setData(filename, data) {
    let skyid =  buildSkyID()
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

export function getOrCreate(file) {}