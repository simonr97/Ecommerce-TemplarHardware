import { useState } from 'react'

import {
    Button,
    useColorModeValue,
    HStack,
    Input,
  } from '@chakra-ui/react';

const ItemCount = ({stock, onAdd}) => {  
  const [count, setCount] = useState(1)
    return(
         <>
    <HStack maxW='320px'>
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
    <Input readOnly={true} value={count} />
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