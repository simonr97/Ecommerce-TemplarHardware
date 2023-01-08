
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetail from './components/ItemDetailContainer/ItemDetail'
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  return (
    <ChakraProvider>
    <div style={{backgroundColor:'#EEEEEE'}}>
    <Navbar/>
    <ItemListContainer welcomeText1={'Bienvenidos a'} welcomeText2={'Templar Hardware'}/>
    <ItemDetail/>
    </div>
    </ChakraProvider>
  );
}

export default App;
