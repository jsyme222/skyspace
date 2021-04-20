import Modal from "./modal-root";
import { useAtom } from "jotai";
import { authenticated, configAtom, drawerOpen, toastMessage } from "../../data/jotai/Atoms";
import SkyIDLogo from "../skyid/logo/skyid-logo";
import { ButtonBase } from "@material-ui/core";
// import { getData, setData } from "../skyid/actions";
import buildSkyid from "../skyid/skyid";
import { ConfigFile } from "../../data/models/models";
import { APP_VERISON } from "../../data/jotai/AtomActions";
import SkyID from "skyid";

export default function LoginModal() {
  const [open, setOpen] = useAtom(drawerOpen);
  const [auth, setAuth] = useAtom(authenticated)
  const [confAtom, setConfAtom] = useAtom(configAtom);
  const [version] = useAtom(APP_VERISON);
  const [toast, setToast] = useAtom(toastMessage);

  const skyid = buildSkyid(skyidEventCallback);

  function skyidEventCallback(message) {
    const setConfig = (data) => {
      window.localStorage.setItem("config", data);
      !confAtom&&setConfAtom(JSON.parse(data))
    };

    switch (message) {
      case "login_fail":
        console.log("Login failed");
        break;
      case "login_success":
        console.log("Login succeed!");
        skyid.getJSON("config.json", function (response, revision) {
          console.log(response);
          if (response === "") {
            let newConfig = new ConfigFile().file;
            console.info("NO CONFIG -> CREATING NOW :)")
            skyid.setJSON("config.json", newConfig, function(response) {
              if (response !== true) {
                alert("Sorry, skyid.setFile failed :(");
                setConfig({"version": "ERROR"})
              }else{
                setToast({message: "Created User config.json"});
                setConfig(JSON.stringify(newConfig))
              }
            })
          } else {
            console.info("FOUND CONFIG")
            setConfig(JSON.stringify(response))
          }
          setOpen(() => !drawerOpen);
          setAuth(() => !auth)
        })
        break;
      case "destroy":
        console.log("Logout succeed!");
        break;
      default:
        console.log(message);
        break;
    }
  }


  const login = () => {
    skyid.sessionStart();
  };

  return (
    <Modal open={!auth} className={"login"}>
      <ButtonBase onClick={login} className={"login-btn"}>
        <SkyIDLogo />
        <h1>LOGIN</h1>
      </ButtonBase>
    </Modal>
  );
}
