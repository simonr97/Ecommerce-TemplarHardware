
import Item from '../Item/Item.js'
import { SimpleGrid,Spinner,Text,Box } from '@chakra-ui/react'


const ItemList = ({products,loading}) =>{


    if (loading) {
        return (
            <Box  
                m={10} 
                textAlign={'center'}>
                <Spinner size='xl'/>
                <Text colorScheme='black' fontSize='2xl'>Cargando...</Text>
            </Box>
        )
    }

    return(
            <SimpleGrid columns={4} spacing={4} minChildWidth='200px'>
                {products.map(prod =>{return(<Item key={prod.id} product={prod}/>)})}
            </SimpleGrid>
    )
}

export default ItemList


