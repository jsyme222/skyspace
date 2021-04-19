import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import buildSkyid from "../skyid/skyid";

export default function Logout({ iconOnly }) {
  const skyid = buildSkyid();

  const skyidLogout = () => {
    skyid.sessionDestroy();
    localStorage.removeItem("config");
    window.location.reload();
  };

  return (
    <Tooltip title={"Logout"}>
      {!iconOnly ? (
        <Button
          style={{ fill: "red" }}
          onClick={skyidLogout}
          endIcon={<Lock />}
        >
          Logout
        </Button>
      ) : (
        <IconButton onClick={skyidLogout}>
          <Lock style={{ fill: "red" }} />
        </IconButton>
      )}
    </Tooltip>
  );
}
