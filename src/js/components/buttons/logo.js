import { ButtonBase } from "@material-ui/core";
import { useAtom } from "jotai";
import { APP_VERISON } from "../../data/jotai/AtomActions";
import { activeComponent } from "../../data/jotai/Atoms";
import logo from "../../../logo.svg";
import "../../../css/buttons/buttons.scss";

export default function Logo() {
  // eslint-disable-next-line
  const [activeComp, setActiveComp] = useAtom(activeComponent);
  const [version] = useAtom(APP_VERISON);

  const goHome = () => {
    if (activeComp !== "dashboard") {
      setActiveComp("dashboard");
    }
  };

  return (
    <ButtonBase onClick={goHome} className={"logo-button"}>
      <div>
        <h1>
          Sky<span>Space</span>
        </h1>
        <p>Create your space.</p>
      </div>
      <div className={"version"}>
        <img src={logo} alt={"SkySpace Logo"} />
        <span>v{version}</span>
      </div>
    </ButtonBase>
  );
}
