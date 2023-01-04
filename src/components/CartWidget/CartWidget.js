import { React } from 'react';
import { Flex } from '@chakra-ui/react';
import { BiCart } from "react-icons/bi";

const CartWidget = () => {
    return (
        <Flex alignItems={'center'}>
            <BiCart size="32px"/>0
        </Flex>
    )
}

export default CartWidget;