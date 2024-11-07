import {Box, Input, Text,
        TableContainer, Td, Th, Thead, Tr, Table, Tbody, 
        Button, Select } from "@chakra-ui/react";
import {useState} from "react";
import {useDebouncedCallback} from 'use-debounce';
import alphafrogRequestHandler from "@/configs/axiosConfig";

export default function DomesticIndex() {

  const [indexQueryData, setIndexQueryData] = useState();
  const [indexQueryResult, setIndexQueryResult] = useState([]);
  const [pageSize, setPageSize] = useState(10);


  const debouncedIndexQuery = useDebouncedCallback(
    (query) => {
      if (query.length >= 2) {
        alphafrogRequestHandler.get('/index/get/search', {
          params: {
            query: query,
            page: 1,
            page_size: pageSize
          }
        })
        .then(response => response.data)
        .then(data => {
          setIndexQueryResult(data.result)
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    },
    300
  );

  const handleIndexQuery = (e) => {
    const query = e.target.value;
    setIndexQueryData(query);
    debouncedIndexQuery(query);
  }

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
  }



  return (
    <Box>
      <Box>
        <Text>查找指数</Text>
        <Input htmlSize={10} placeholder={"输入指数代码、名称……"} onChange={handleIndexQuery}/>
        <Box mt={'10px'}>
          <Text>每页显示</Text>
          <Select defaultValue={10} w={'100px'} onChange={handlePageSizeChange}>
            <option value={10}>10条</option>
            <option value={20}>20条</option>
            <option value={50}>50条</option>
            <option value={100}>100条</option>
          </Select>
        </Box>
      </Box>
      <Box
        mt={'10px'}
      >
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>指数代码</Th>
                <Th>指数名称</Th>
                <Th>操作</Th>
                <Th>指数全称</Th>
                <Th>指数市场</Th>
                <Th>指数发布人</Th>
                
              </Tr>
            </Thead>
            <Tbody>
              {indexQueryResult.map((index, indexKey) => {
              return (
                <Tr>
                  <Td>{index.tsCode}</Td>
                  <Td>{index.name}</Td>
                  <Td>
                    <Button size="sm">详情</Button>
                  </Td>
                  <Td>{index.fullName}</Td>
                  <Td>{index.market}</Td>
                  <Td>{index.publisher}</Td>
                  
                </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
