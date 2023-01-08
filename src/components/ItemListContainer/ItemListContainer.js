import { React } from 'react';
import Head from 'next/head';
import ItemCount from '../ItemCount/ItemCount.js'
import ItemList from '../ItemList/ItemList.js' 
import {
  Box,
  Heading,
  Container,
  Text,
  Stack
} from '@chakra-ui/react';

const ItemListContainer = ({welcomeText1, welcomeText2}) => {

  const stock = 10

    return (
        <>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
              rel="stylesheet"
            />
          </Head>
    
          <Container maxW={'8xl'}>
            <Stack
              as={Box}
              textAlign={'center'}
              py={{ base: 20, md: 36 }}>
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}>
                {welcomeText1}<br />
                <Text as={'span'} color={'green.400'}>
                {welcomeText2}
                </Text>
              </Heading>
              <Text color={'gray.500'}>
              Work in Progress
              </Text>
            </Stack>
            <ItemList/>
          </Container>
          <Container maxW='container.full'> 
          </Container>
          <ItemCount onAdd={(count) => console.log(count)} stock={stock}/>
        </>
      );
}

export default ItemListContainer;