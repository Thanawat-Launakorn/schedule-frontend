import React from "react";
import { useLocation } from "react-router-dom";
type Props = {};

export default function EditUser({}: Props) {
  const location = useLocation();
  const id = location?.state;

  return <div>EditUser</div>;
}
