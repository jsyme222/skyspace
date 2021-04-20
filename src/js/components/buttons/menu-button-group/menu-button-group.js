import {
  ButtonGroup,
  IconButton,
  Grow,
  List,
  ListItemText,
  Paper,
  Tooltip,
  Button,
  ClickAwayListener,
} from "@material-ui/core";
import { Menu, MoreHoriz, Settings, FileCopy } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useState } from "react";
import {
  configAtom,
  editorState,
  toastMessage,
} from "../../../data/jotai/Atoms";
import Logout from "../../buttons/logout";
import { setData } from "../../skyid/actions";

export default function MenuButtonGroup({ setOpen }) {
  // eslint-disable-next-line
  const [toast, setToast] = useAtom(toastMessage);
  const [config, setConfig] = useAtom(configAtom);
  const [showUserMenu, setShowUserMenu] = useState(false);
  // eslint-disable-next-line
  const [editorStateContent, setEditorModalContent] = useAtom(editorState);
  const skyid = JSON.parse(localStorage.getItem("skyid"));

  const saveConfig = () => {
    setEditorModalContent({
      modalOpen: true,
      content: JSON.stringify(config),
      setDataFunc: (data) => {
        let parsedData = JSON.parse(data);
        setData("config.json", parsedData).then(() => {
          console.log("SET DATA");
          setConfig(parsedData);
          localStorage.setItem("config", data);
        });
      },
      notEncryptable: true,
      notPublishable: true,
      docTitle: "config.json",
      titleEditable: false
    });
  };

  const closeMenu = (func) => {
    func(false);
  };

  const copyUserid = () => {
    navigator.clipboard.writeText(skyid && (skyid.userId || "NO USER"));
    setToast({ message: "Copied UserID to clipboard" });
  };

  return (
    <ClickAwayListener onClickAway={() => setShowUserMenu(false)}>
      <div>
        <ButtonGroup>
          <Logout iconOnly />
          <IconButton onClick={() => setShowUserMenu(() => !showUserMenu)}>
            <MoreHoriz style={{ fill: "white" }} />
          </IconButton>
          <IconButton onClick={() => setOpen(false)}>
            <Menu style={{ fill: "white" }} />
          </IconButton>
        </ButtonGroup>
        <Grow
          in={showUserMenu}
          onClose={() => closeMenu(setShowUserMenu)}
          unmountOnExit
        >
          <Paper className={"submenu"}>
            <div className={"userid"}>
              <Tooltip title={skyid && skyid.userId}>
                <p>
                  USER: <span>{skyid && (skyid.userId || "NO USER")}</span>
                </p>
              </Tooltip>
              <IconButton style={{ height: 20 }} onClick={copyUserid}>
                <FileCopy style={{ height: 20 }} />
              </IconButton>
            </div>
            <List>
              <ListItemText>
                <Button
                  variant={"text"}
                  startIcon={<Settings />}
                  onClick={saveConfig}
                  color={"secondary"}
                >
                  User Config
                </Button>
              </ListItemText>
            </List>
          </Paper>
        </Grow>
      </div>
    </ClickAwayListener>
  );
}
