import { ReactNode, React } from 'react';
import CartWidget from '../CartWidget/CartWidget';
import { GiBlackKnightHelm } from "react-icons/gi";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ['Componentes', 'Arma Tu PC', 'Perifericos'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    color='#1A202C' 
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('green.300'),
      color: 'black'
    }}
    href={'#'}>
    {children}
  </Link>
);

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Box bg={useColorModeValue('green.400')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
              color='#1A202C' 
            />
            <HStack h={16} spacing={8} alignItems={'center'}>
              <GiBlackKnightHelm  size="32px" />
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            
            <CartWidget/>
            
          </Flex>
  
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    );
}
export default Navbar