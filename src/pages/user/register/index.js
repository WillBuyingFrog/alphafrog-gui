import {Box, Input, InputGroup, InputLeftAddon, Text, Button, VStack, Flex} from "@chakra-ui/react";
import Navbar from "@/components/common/Navbar";
import {Link} from "react-router-dom";
import {useState} from "react";
import md5 from 'crypto-js/md5';

import alphafrogRequestHandler from '@/configs/axiosConfig';

export default function Register() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleRegister = () => {
    const encryptedPassword = md5(password).toString();
    console.log('Encrypted password:', encryptedPassword);
    if (!isValidEmail(email)) {
      alert('邮箱格式不正确')
      return
    }
    if (password !== confirmPassword) {
      alert('两次输入的密码不一致')
      return
    }

    alphafrogRequestHandler.post('/user/register', {
      username: username,
      password: encryptedPassword,
      email: email
    }).then(response => {
      if (response.status === 200) {
        alert('注册成功')
      } else {
        alert('注册失败')
      }
    }).catch(error => {
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
          mt={'20px'}
          w={'500px'}
          alignItems={'start'}
          gap={'10'}
        >
          <Text fontWeight={'bold'}>注册</Text>

          <InputGroup w={'300px'}>
            <InputLeftAddon>用户名</InputLeftAddon>
            <Input type='tel' placeholder='输入用户名...' onChange={handleUsernameChange} />
          </InputGroup>
          <Flex>
            <Box>
              <InputGroup w={'300px'}>
              <InputLeftAddon>密码</InputLeftAddon>
              <Input type='password' placeholder='输入密码...' onChange={handlePasswordChange} />
            </InputGroup>
            <InputGroup w={'300px'}>
              <InputLeftAddon>确认密码</InputLeftAddon>
              <Input type='password' placeholder='再次输入密码...' onChange={handleConfirmPasswordChange} />
            </InputGroup>
            </Box>
            
          {password !== confirmPassword && confirmPassword !== '' && (
            <Text color="red.500" fontSize="sm">
              两次输入的密码不一致
            </Text>
          )}
          </Flex>
         
          <InputGroup w={'300px'}>
            <InputLeftAddon>邮箱</InputLeftAddon>
            <Input type='email' placeholder='输入邮箱...' onChange={handleEmailChange} />
          </InputGroup>

          <Button onClick={handleRegister}>注册</Button>

          <Text>已有账号？<Link to={'/login'}>立即登录</Link></Text>

        </VStack>
      </Box>
    </Box>
  )
}
