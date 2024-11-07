import {Box} from "@chakra-ui/react";
import {Link} from "react-router-dom";


export default function SideBarItem({title, href}) {
  return (
    <Box
      w={'100%'}
      h={'50px'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      _hover={{
        borderBottom: '2px solid lightblue',
        transition: 'border-bottom 0.2s'
      }}
    >
      <Link to={href}>
        {title}
      </Link>
    </Box>
  )
}
