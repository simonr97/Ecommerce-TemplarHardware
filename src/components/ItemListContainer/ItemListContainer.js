import { React } from 'react';
import Head from 'next/head';
import ItemCount from '../ItemCount/ItemCount.js'
import {
  Box,
  Heading,
  Container,
  Text,
  Stack
} from '@chakra-ui/react';

const ItemListContainer = (props) => {

  const stock = 10

    return (
        <>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
              rel="stylesheet"
            />
          </Head>
    
          <Container maxW={'3xl'}>
            <Stack
              as={Box}
              textAlign={'center'}
              spacing={{ base: 8, md: 14 }}
              py={{ base: 20, md: 36 }}>
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}>
                {props.welcomeText1}<br />
                <Text as={'span'} color={'green.400'}>
                {props.welcomeText2}
                </Text>
              </Heading>
              <Text color={'gray.500'}>
               Work in Progress
              </Text>
              <Stack
                direction={'column'}
                spacing={3}
                align={'center'}
                alignSelf={'center'}
                position={'relative'}>
              </Stack>
            </Stack>
            <ItemCount onAdd={(count) => console.log(count)} stock={stock}/>
          </Container>
          
        </>
      );
}

export default ItemListContainer;