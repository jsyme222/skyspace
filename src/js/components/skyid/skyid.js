import SkyID from "skyid";

export default function buildSkyid(skyidEventCallback=null) {
  var devMode = false;
  if (
    window.location.hostname === "192.168.0.13" ||
    window.location.hostname === "idtest.local" ||
    window.location.hostname === "localhost" ||
    window.location.protocol === "file:"
  ) {
    devMode = true;
  }

  var opts = { devMode: devMode };

  let skyid = new SkyID("SkySpace", skyidEventCallback, opts);

  return skyid;
}

