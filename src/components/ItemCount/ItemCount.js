import { useState } from 'react'

import {
    Button,
    useColorModeValue,
    HStack,
    Text,
  } from '@chakra-ui/react';

const ItemCount = ({stock, onAdd, onBuy}) => {  
  const [count, setCount] = useState(1)
    return(
         <>
    <HStack align="center" justify="center">
    <Button 
        bg='green.400' 
        color='#1A202C' 
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('green.300'),
          color: 'black'
        }} 
       onClick={() => setCount(count + 1) } 
       disabled = {stock === count? true:false}>
        +
    </Button>
    <Text px={10}>{count}</Text>
    <Button 
        bg='green.400'
        color='#1A202C' 
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('green.300'),
          color: 'black'
        }}  
        onClick={() => setCount(count - 1)}
        disabled = {count === 1? true:false}>
        -
    </Button>
  </HStack>

   <Button 
      mt={1}
        bg='green.400' 
        color='#1A202C' 
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('green.300'),
          color: 'black'
        }}
        onClick={() => onAdd(count)}>
        Agregar
      </Button>
      
    </>
    
  )
}

export default ItemCount;