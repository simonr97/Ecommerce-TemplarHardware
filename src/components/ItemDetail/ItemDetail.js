import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Heading,
    SimpleGrid,
    StackDivider,
    List,
    ListItem,
    Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouteLink} from "react-router-dom";
import { MdLocalShipping } from 'react-icons/md';
import ItemCount from '../ItemCount/ItemCount.js'


const ItemDetail = ({product}) => {

const {key,name,smallDescription,price,category,img,stock,description} = product

let features = [...description]

let arr = features.splice(0, (features.length)/2);

const [quantity, setQuantity] = useState(0);

const handleOnAdd = (qty) => {
  setQuantity(qty)
}

console.log(quantity);

    return(
        <Container boxShadow='md' bg='white' maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={img}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
            objectFit='scale-down'
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {name}
            </Heading>
            <Text
              color='gray.900'
              fontWeight={300}
              fontSize={'2xl'}>
              U$D {price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor='green.400'
              />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color='gray.500'
                fontSize={'2xl'}
                fontWeight={'300'}>
                {smallDescription}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color='green.400'
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Features
              </Text>

              <SimpleGrid columns={[2, null, 3]} spacing={10}>
                <List spacing={2}>
                  {features.map((d,key) => {
                    return(
                        <ListItem key={key}>{d}</ListItem>
                    )
                  })}
                </List>
                <List spacing={2}>
                  {arr.map((d,key) => {
                    return(
                        <ListItem key={key}>{d}</ListItem>
                    )
                  })}
                </List>
              </SimpleGrid>
            </Box>
          </Stack>

          
          {quantity > 0 ? (
            <Box align="center" justify="center">
            <RouteLink to='/cart'>
              <Button
                mt={1}
                bg='green.400' 
                color='#1A202C' 
                _hover={{
                          textDecoration: 'none',
                          bg: 'green.300',
                          color: 'black'
                        }}
                >
                  Terminar Compra
                </Button>
              </RouteLink>
              </Box>
          ) : 
          <ItemCount onAdd={handleOnAdd} stock={stock}/>}
          
          
          <Stack direction="row" alignItems="center" justifyContent={'center'}>
          <Text></Text>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
    )
}

export default ItemDetail;