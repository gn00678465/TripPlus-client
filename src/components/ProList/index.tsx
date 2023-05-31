import Pagination from '@/components/Pagination';
import { useState } from 'react';
import Card from '@/components/Card';
import useSWR, { useSWRConfig } from 'swr';
import { apiGetProject } from '@/api/index';
import { currency } from '@/utils';
import { Box, Container, Center, Flex, Select } from '@chakra-ui/react';
const category = [
  { name: '全部主題', value: 'all' },
  { name: '社會計劃', value: 0 },
  { name: '創新設計', value: 1 },
  { name: '精選商品', value: 2 }
];

const tabs = [
  { name: '最新上線', value: 'recently_launched' },
  { name: '即將結束', value: 'recently_ending' },
  { name: '全部專案', value: 'all' },
  { name: '專案人次', value: 'project_backers' },
  { name: '熱門專案', value: 'hot_project' }
];

const ProList = () => {
  const { mutate } = useSWRConfig();

  const getCategory = (value: number) => {
    switch (value) {
      case 0:
        return '社會計劃';
      case 1:
        return '創新設計';
      case 2:
        return '精選商品';
      default:
        return '';
    }
  };

  const [list, setList] = useState<Project.ProjectItem[]>([]);
  const [page, setPage] = useState<Project.Pagination>({
    page: 1,
    limit: 1,
    totalPages: 1
  });
  const [sortType, setSortType] = useState('recently_launched');

  const getProjects = (data: ApiProject.Projects) => {
    const items = data.items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        category: getCategory(item.category),
        team: item.teamId.title,
        teamId: item.teamId.id,
        keyVision: item.keyVision,
        target: currency(item.target, 'zh-TW', 'TWD'),
        progressRate: item.progressRate,
        countDownDays: item.countDownDays,
        type: item.type,
        updatedAt: item.updatedAt
      };
    });

    setList(() => items);
  };

  const { data: projectsList } = useSWR('/api/project', apiGetProject, {
    onSuccess(data, key, config) {
      if (data && data.status === 'Success') {
        getProjects(data.data);
        setPage({
          page: data.data.page,
          limit: data.data.limit,
          totalPages: data.data.totalPages
        });
      }
    }
  });

  const onPageChange = (page: number) => {
    console.log(page);
  };

  const changeSortType = (value: string) => {
    setSortType(value);
    mutate('/api/project');
  };

  return (
    <Box pt={10} className="pb-10 md:pb-20">
      <Container maxW={'container.xl'}>
        <Flex className="flex-col md:flex-row md:justify-between">
          <Select w={{ base: 'full', md: 200 }}>
            {category.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>

          <Flex
            borderColor={'gray.300'}
            borderStyle={'solid'}
            fontWeight={500}
            color={'gray.900'}
            justifyContent={'space-between'}
            borderRadius={{ base: 'xl', sm: 'full' }}
            mt={{ base: 5, md: 0 }}
            className="bg-secondary-light px-1  text-sm xs:px-5 xs:text-base"
          >
            {tabs.map((item) => (
              <Box
                key={item.value}
                p={3}
                w={{ base: 16, sm: 'auto' }}
                cursor={'pointer'}
                fontWeight={500}
                className={`hover:text-secondary-emphasis  md:block ${
                  sortType === item.value ? 'text-secondary-emphasis' : ''
                }`}
                onClick={() => changeSortType(item.value)}
              >
                {item.name}
              </Box>
            ))}
          </Flex>
        </Flex>

        <Flex flexWrap={'wrap'} pt={10}>
          {list.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </Flex>

        <Center mt={10}>
          <Pagination
            totalPage={page.totalPages}
            currentPage={page.page}
            onPageChange={onPageChange}
          />
        </Center>
      </Container>
    </Box>
  );
};

export default ProList;
