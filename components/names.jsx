import React from "react";
import { introData as data } from "../data/intro.data";

export default function Names({ setActiveMenu }) {
  return (
    <div onMouseLeave={setActiveMenu(null)}>
      <div onMouseOver={setActiveMenu(0)}>
        <h1
          className="text-6xl lg:text-7xl font-light tracking-tight"
        >
          {data.name.firstName}
        </h1>
      </div>
      <div onMouseOver={setActiveMenu(1)}>

      <h1
        className="text-6xl lg:text-7xl font-light tracking-tight text-muted-foreground"
      >
        {data.name.lastName}
      </h1>
      </div>
    </div>
  );
}
