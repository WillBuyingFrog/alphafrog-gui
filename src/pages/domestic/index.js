import {Box, Flex} from "@chakra-ui/react";
import SideBar from "../../components/common/SideBar";
import {Outlet} from "react-router-dom";


const sideBarItems = [
  {
    title: "沪深指数",
    href: "/domestic/index"
  },
  {
    title: "沪深基金",
    href: "/domestic/fund"
  },
  {
    title: "沪深个股",
    href: "/domestic/stock"
  }
]

export default function Domestic() {
  return (
    <Flex
      w={'100%'}

    >
      <Box
        w={'20%'}
        h={'100vh'}

      >
        <SideBar sideBarItems={sideBarItems}/>
      </Box>
      <Box
        w={'70%'}
      >
        <Outlet/>
      </Box>

    </Flex>
  )
}
