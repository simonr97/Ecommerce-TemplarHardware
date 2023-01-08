import { useEffect, useState } from 'react'
import { Box, useColorModeValue, Card, Image, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react'

const Item = (productList) =>{

  const [hover, setHover] = useState(false)
  
  const {key,name,price,category,img,stock,description} = productList.product

    return(
        <Card 
        
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)} 
        bg='White' maxW='sm'
        boxShadow='md'
        //{hover? boxShadow='md':boxShadow='xl'}
        >
  <CardBody >
    <Box align="center">
      <Image
        src={img}
        alt={category}
        borderRadius='lg'
        boxSize='200px'
        objectFit='scale-down'
      />
    </Box>
    <Stack mt='6' spacing='3'>
      <Heading isTruncated size='md'>{name}</Heading>
      {/* <Text noOfLines={3}>
        {description}
      </Text> */}
      <Text colorScheme='black' fontSize='2xl'>
        ${price}
      </Text>
    </Stack>
  </CardBody>
  <CardFooter>
    <ButtonGroup spacing='2'>
    <Button 
      mt={1}
        bg='green.400' 
        color='#1A202C' 
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('green.300'),
          color: 'black'
        }}>
        Comprar
      </Button>
      <Button variant='ghost' colorScheme='black'>
        Agregar al carrito
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
    )
}

export default Item