import {Box} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/common/Navbar";


export default function Landing() {
  return (
    <Box
      w={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box
        w={'1000px'}
      >
        <Navbar/>
        <Outlet/>
      </Box>

    </Box>
  );
}
