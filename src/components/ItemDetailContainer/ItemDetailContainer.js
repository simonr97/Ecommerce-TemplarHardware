import { getProductsById } from '../../asyncMock.js'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import ItemDetail from '../ItemDetail/ItemDetail.js'
import { Spinner,Box,Text} from '@chakra-ui/react'



const ItemDetailContainer = () =>{

    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(true)

    const {productId} = useParams()

    useEffect(() => {
        getProductsById(productId).then(prod => {
          setProducts(prod)
        }).catch(err =>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    },[productId])

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
        <ItemDetail product={products} />
    )
}

export default ItemDetailContainer