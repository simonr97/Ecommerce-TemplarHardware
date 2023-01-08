import { useEffect, useState } from 'react'
import Item from '../Item/Item.js'
import { SimpleGrid,Spinner,Text,Box } from '@chakra-ui/react'
import { getProducts } from '../../asyncMock.js'

const ItemList = () =>{

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    console.log(products);

    useEffect(() => {
        getProducts().then(prod => {
          setProducts(prod)
        }).catch(err =>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    },[])

    if (loading) {
        console.log('spinner')
        return (
            <Box  
                m={10} 
                textAlign={'center'}>
                <Spinner size='xl'/>
                <Text colorScheme='black' fontSize='2xl'>Cargando...</Text>
            </Box>
        )
    }
    
    //

    return(
            <SimpleGrid columns={4} spacing={4} minChildWidth='200px'>
                {products.map(prod =>{return(<Item key={prod.id} product={prod}/>)})}
            </SimpleGrid>
    )
}

export default ItemList


