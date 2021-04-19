import Modal from "./modal-root";
import { useAtom } from "jotai";
import { authenticated, configAtom, drawerOpen } from "../../data/jotai/Atoms";
import SkyIDLogo from "../skyid/logo/skyid-logo";
import { ButtonBase } from "@material-ui/core";
import { getData } from "../skyid/actions";
import buildSkyid from "../skyid/skyid";

export default function LoginModal() {
  const [open, setOpen] = useAtom(drawerOpen);
  const [auth, setAuth] = useAtom(authenticated)
  const [confAtom, setConfAtom] = useAtom(configAtom);

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
        getData("config.json", setConfig);
        setOpen(() => !drawerOpen);
        setAuth(() => !auth)
        break;
      case "destroy":
        console.log("Logout succeed!");
        break;
      default:
        console.log(message);
        break;
    }
  }

  const skyid = buildSkyid(skyidEventCallback);

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
