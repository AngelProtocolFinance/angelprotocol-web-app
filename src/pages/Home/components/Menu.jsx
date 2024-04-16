import React from "react";
import "../styles/menu.css";
import MenuPosts from "./MenuPosts";
import MenuCategories from "./MenuCategories";
// import Link from "next/link";
// import Image from "next/image";
// import MenuPosts from "../menuPosts/MenuPosts";
// import MenuCategories from "../menuCategories/MenuCategories";

const Menu = () => {
  return (
    <div className={"menu_container"}>
      <h2 className={"subtitle"}>{"What's hot"}</h2>
      <h1 className={"title"}>Most Popular</h1>
      <MenuPosts withImage={false} />
      <h2 className={"subtitle"}>Discover by topic</h2>
      <h1 className={"title"}>Categories</h1>
      <MenuCategories />
      <h2 className={"subtitle"}>Chosen by the editor</h2>
      <h1 className={"title"}>Editors Pick</h1>
      <MenuPosts withImage={true} />
    </div>
  );
};

export default Menu;
