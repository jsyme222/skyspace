import { IconButton, Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Menu } from "@material-ui/icons";
import { useAtom } from "jotai";
import { useEffect } from "react";
import "./App.scss";
import MainDrawer from "./js/components/drawer/main-drawer";
import LoginModal from "./js/components/modals/login-modal";
import buildSkyid from "./js/components/skyid/skyid";
import {
  activeComponent,
  authenticated,
  configAtom,
  drawerOpen,
  toastMessage,
} from "./js/data/jotai/Atoms";
import EditorModal from "./js/components/modals/editor-modal/editor-modal";
import CreateComponent from "./js/components/create/create-component";
import DiscoverComponent from "./js/components/discover/discover-component";
import MyPosts from "./js/components/my-posts/my-posts";

function App() {
  const [config, setConfig] = useAtom(configAtom);
  // eslint-disable-next-line
  const [open, setOpen] = useAtom(drawerOpen);
  // eslint-disable-next-line
  const [login, setLogin] = useAtom(authenticated);
  const [toast, setToast] = useAtom(toastMessage);
  // eslint-disable-next-line
  const [activeComp, setActiveComp] = useAtom(activeComponent);
  const skyid = buildSkyid();

  useEffect(() => {
    setConfig(JSON.parse(localStorage.getItem("config")));
    skyid.seed && setLogin(true);
    // eslint-disable-next-line
  }, [localStorage.getItem("config"), skyid.seed]);

  return (
    <div className="App">
      <IconButton className={"menu-button"} onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <div className={"app-body"}>
        {activeComp==="dashboard"&&<h1>SkySpace v{config && config.version}</h1>}
        {activeComp==="create"&&<CreateComponent />}
        {activeComp==="discover"&&<DiscoverComponent />}
        {activeComp==="my-posts"&&<MyPosts />}
      </div>
      <MainDrawer />
      <LoginModal />
      <EditorModal />
      <Snackbar
        open={toast && toast.message}
        autoHideDuration={3000}
        onClose={() => setToast({})}
      >
        <Alert onClose={() => setToast({})} severity="success" variant={"filled"}>
        <div>{toast.message}</div>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
