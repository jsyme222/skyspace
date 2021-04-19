import skyidLogo from '../../../../assets/SkyID_Logo.png';
import "../../../../css/skyid/skyid.scss";

export default function SkyIDLogo({ noTitle }) {
    return (
        <div className={"skyid-logo"}>
            <img src={skyidLogo} alt={"SkyID Logo"} />
            {!noTitle&&<h1 id={"skyid"}>SkyID</h1>}
        </div>
    )
}