import {Box, Input, InputGroup, InputLeftAddon, Text, Button, VStack} from "@chakra-ui/react";
import Navbar from "../../../components/common/Navbar";
import {Outlet, Link} from "react-router-dom";

import {useState} from "react";
import {useNavigate} from "react-router-dom";

import md5 from "crypto-js/md5";

import alphafrogRequestHandler from "@/configs/axiosConfig";
export default function Login(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = () => {


    const encryptedPassword = md5(password).toString();
    console.log(encryptedPassword);

    alphafrogRequestHandler.post('/user/login', {
      username: username,
      password: encryptedPassword
    })
    .then(response => {
      if(response.status === 200){
        localStorage.setItem('token', response.data.message);
        alert('登录成功');
        navigate('/domestic');
      } else {
        alert('登录失败');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

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
        <VStack
          mt={'20px'} w={'300px'}
          alignItems={'start'}
          gap={'10'}
        >
          <Text fontWeight={'bold'}>登录</Text>

          <InputGroup>
            <InputLeftAddon>用户名</InputLeftAddon>
            <Input type='tel' placeholder='输入用户名...' onChange={handleUsernameChange} />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon>密码</InputLeftAddon>
            <Input type='password' placeholder='输入密码...' onChange={handlePasswordChange} />
          </InputGroup>

          <Button onClick={handleLogin}>登录</Button>

          <Text>没有账号？<Link to={'/register'}>立即注册</Link></Text>

        </VStack>
      </Box>

    </Box>
  )
}
