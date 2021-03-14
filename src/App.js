import React from "react";
import { useSelector } from "react-redux";

import Header from "./Header";
import Content from "./Content";

export default function App() {
  const { fontSize } = useSelector((state) => state);
  return (
    <div style={{
      height: "100%",
      fontFamily: "sans-serif",
      fontSize: `${fontSize || 14}px`
    }}>
      <Header />
      <Content />
    </div>
  );
};
