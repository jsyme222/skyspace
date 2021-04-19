import {
  Button,
  ButtonBase,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Create, FindInPage } from "@material-ui/icons";
import { useAtom } from "jotai";
import {
  activeComponent,
  authenticated,
  drawerOpen,
} from "../../data/jotai/Atoms";
import ButtonGroup from "./menu-button-group/menu-button-group";

export default function MainDrawer() {
  // eslint-disable-next-line
  const [auth, setAuthenticated] = useAtom(authenticated);
  const [open, setOpen] = useAtom(drawerOpen);
  // eslint-disable-next-line
  const [activeComp, setActiveComp] = useAtom(activeComponent);

  return (
    <Drawer
      className={"main-drawer"}
      variant="persistent"
      anchor="left"
      open={auth && open}
    >
      <div className={"menu"}>
        <ButtonBase onClick={() => setActiveComp("dashboard")}>
          <h1>
            SKY<span>space</span>
          </h1>
          <p>
            Create your space.
          </p>
        </ButtonBase>
        <Divider />
        <ButtonGroup setOpen={setOpen} />
        <List className={"menu-items"}>
          <ListItem component={Button} onClick={() => setActiveComp("create")}>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText>Create</ListItemText>
          </ListItem>
          <ListItem component={Button} onClick={() => setActiveComp("discover")}>
            <ListItemIcon>
              <FindInPage />
            </ListItemIcon>
            <ListItemText>Discover</ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
