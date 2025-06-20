// utils/getReacticons.ts

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import * as TbIcons from "react-icons/tb";
import { FaQuestion } from "react-icons/fa";

const iconPacks = {
  Fa: FaIcons,
  Md: MdIcons,
  Gi: GiIcons,
  Bi: BiIcons,
  Ai: AiIcons,
  Bs: BsIcons,
  Io: IoIcons,
  Tb: TbIcons,
};

export function getIconComponent(iconName) {
  const prefix = iconName.slice(0, 2);
  const iconPack = iconPacks[prefix];

  if (iconPack && iconPack[iconName]) {
    return iconPack[iconName];
  }

  return FaQuestion;
}
