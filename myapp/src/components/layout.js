import React from 'react';
import { Box, Flex, Icon, Button, Center, Divider, Image, Text, Input } from '@chakra-ui/react';
import { RiSearch2Line } from 'react-icons/ri';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';
import SearchList from './SearchList';

const Layout = (props) => {

    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const searchColor = useColorModeValue('gray.200', 'gray.200');

    let displayProp = false
    let dataProp = false
    let wordSearchProp = false;
    if(props.id === null || undefined){
        displayProp = true
    }
    if(props.wordSearch){
        wordSearchProp = true
        if(props.data.length > 0){
            dataProp = true
        }
    }
    
    

    return (
        <Box display={{ md: 'flex'}} px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  bg={bgColor} align="center" >
            
            <Box align='center' width={['100%', '100%', '50%']}  h={{ base: '50%', md: '85vh', lg: '85vh' }} mt='0' marginBottom={{base : '30px'}}>
                <Box>
                    <Flex align='center' justify='center'>
                        <Input placeholder='Youtube video url' borderRadius='none' width="70%" h={{base: '25px', md: '35px', lg: '40px'}} fontSize={{base: '13px', md: '18px', lg: '23px'}} onChange={(e) => props.setUrl(e.target.value)} required/>
                        <Button onClick={(e) => props.getVideo()} borderRadius='none' bg={searchColor} width='70px' align='center' py={1} h={{ base: '25px', md: '35px', lg: '40px' }} _hover={{ bg: 'gray.400' }}>
                            <Icon as={RiSearch2Line} w={{ base: '29px', md: '32px', lg: '35px' }} h={{ base: '20px', md: '24px', lg: '27px' }} />
                        </Button>
                    </Flex>
                    
                </Box>
                <Box>
                    <Bounce left>
                        <Flex width="90%" mt={2} h={{base: '250px', md: '400px', lg:'500px'}}>
                            <Box id="player"></Box>
                        </Flex>
                    </Bounce>            
                 
            </Box>
            </Box>

            <Center display={{base : 'none'}}>
                <Divider orientation='vertical' />
            </Center>

         <Box align='center' width={['100%', '100%', '50%']}  h={{ base: '50%', md: '85vh', lg: '85vh' }} >
            {displayProp ? 
            <Box>
            <Bounce bottom> 
                <Box height={{ base: '100px', md: '200px', lg: '300px' }}  borderLeft='1px' borderBottom='1px' borderColor='gray.200' boxShadow='base' width={{base:'60%', lg: '90%'}}>
                    <Image src='/images/video.png' alt='Topic' height='inherit'  width='inherit' />
                </Box >                   
                </Bounce> 
                 <Bounce right>
                    <Box display ='block' py={4} align='center' justify="center" w='full'>
                        <Text fontSize={{ base: '20px', md: '24px', lg: '28px' }} px={{base: '24px', md: '27px', lg: '30px'}}><i><b>How it Works</b></i></Text>
                        <Divider orientation='horizontal' width='90%'></Divider>
                        <Text fontSize={{ base: '16px', md: '20px', lg: '24px' }} px={{base: '24px', md: '27px', lg: '30px'}}>Paste the link of the Youtube video</Text>
                        <Text fontSize={{ base: '16px', md: '20px', lg: '24px' }} px={{base: '24px', md: '27px', lg: '30px'}}>Input a word or sentence in the video to search for their frame location</Text>
                    </Box>
                </Bounce>
                </Box>
                : 
            
                 <Box >
                    <Flex  align='center' justify='center'>
                        <Input placeholder='Word to search' borderRadius='none' width="70%" h={{base: '25px', md: '35px', lg: '40px'}} fontSize={{base: '13px', md: '18px', lg: '23px'}} onChange={(e) => props.setWord(e.target.value)} required/>
                        <Button onClick={(e) =>{
                            props.setwordSearch(true)
                             props.fetchCaption() }} borderRadius='none' bg={searchColor} width='70px' align='center' py={1} h={{ base: '25px', md: '35px', lg: '40px' }} _hover={{ bg: 'gray.400' }}>
                            <Icon as={RiSearch2Line} w={{ base: '29px', md: '32px', lg: '35px' }} h={{ base: '20px', md: '24px', lg: '27px' }} />
                        </Button>
                    </Flex>

                    { wordSearchProp ? <>
                        {dataProp ? 
                        <SearchList data={props.data} id={props.id} setSeekClick={props.setSeekClick} getIndex={props.getIndex}/> : 
                    <Box>
                     
                     <>
                     <Bounce bottom>                                                        
                        <Box height={{ base: '100px', md: '200px', lg: '300px' }} w='100%' borderLeft='1px' borderBottom='1px' borderColor='gray.200' boxShadow='base' width={{base:'60%', lg: '90%'}}>
                            <Image marginTop='20px' src='/images/no_data.png' alt='Searched word is not in the video' height='inherit'  width='inherit'/>
                        </Box >               
                        </Bounce> 
                        <Bounce right>
                            <Box py={4} align='center' justify="center" w='full'>
                                <Text fontSize={{ base: '16px', md: '20px', lg: '24px' }} px={{base: '24px', md: '27px', lg: '30px'}}>Searched word not in the video, check and try again</Text>
                            </Box> 
                        </Bounce></>     
                    
                        : <Box></Box>    
                         </Box> }</> : <></>
                    }
                    </Box>
             }
        </Box>  

        </Box>
        
    )
        
}
export default Layout