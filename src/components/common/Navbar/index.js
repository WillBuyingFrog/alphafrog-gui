import {Box, Flex, Button} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alphafrogRequestHandler from "@/configs/axiosConfig";


export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    alphafrogRequestHandler.post('/user/logout', {
      token: localStorage.getItem('token')
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      if (response.status === 200) {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        alert('登出成功');
        window.location.reload();
      } else {
        alert('登出失败');
      }
    }).catch(error => {
      alert('登出失败，为内部错误，请查看控制台');

    })
  }

  return (
    <Box
      w={'100%'}
      h={'50px'}
    >
      <Flex>
        <Box
          w={'100%'}
          h={'50px'}
          fontSize={'20px'}
          fontWeight={'bold'}
        >
          AlphaFrog
        </Box>
        <Box w={'30%'} />
        <Box
          w={'20%'}
        >
          {isLoggedIn ? (
            <Button onClick={handleLogout}>登出</Button>
          ) : (
            <Button onClick={() => navigate('/login')}>登录</Button>
          )}

        </Box>
      </Flex>

    </Box>
  )
}
