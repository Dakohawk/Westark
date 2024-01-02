import {
    Outlet,
} from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="header">
          <h1>Westark Horse Show Association</h1>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }