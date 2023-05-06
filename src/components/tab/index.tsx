import React from "react";
import { IItemsTabLayout } from "./tab-interface";

type Props = {
  items: IItemsTabLayout[];
  onChange: (value: string) => void;
};

export default function TabLayout({ items, onChange }: Props) {
  return <div>TabLayout</div>;
}
