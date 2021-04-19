import SkyID from "skyid";

export default function buildSkyid(skyidEventCallback=null) {
  var devMode = false;
  if (
    window.location.hostname === "idtest.local" ||
    window.location.hostname === "localhost" ||
    window.location.protocol === "file:"
  ) {
    devMode = true;
  }

  var opts = { devMode: devMode };

  let skyid = new SkyID("SKYspace", skyidEventCallback, opts);

  return skyid;
}

