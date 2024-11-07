import {Box} from "@chakra-ui/react";
import SideBarItem from "./SideBarItem";


export default function SideBar({sideBarItems}) {
  return (
    <Box>
      {sideBarItems.map((item) => (
        <SideBarItem key={item.title} title={item.title} href={item.href}/>
      ))}
    </Box>
  )
}
