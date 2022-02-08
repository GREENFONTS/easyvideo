import React from 'react';
import { Box, Flex, Icon, Button, Center, Divider, Image, Text, Input, } from '@chakra-ui/react';
import { RiSearch2Line } from 'react-icons/ri';
import { useColorModeValue } from '@chakra-ui/react';
import Bounce from 'react-reveal/Bounce';
import SearchList from './SearchList';

const Layout = (props) => {

    // const [isLargerThan770] = useMediaQuery('(min-width: 770px)')
    // const [isLargerThan500] = useMediaQuery('(min-width: 500px)')
    // const [isLargerThan400] = useMediaQuery('(min-width: 400px)')
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const searchColor = useColorModeValue('gray.200', 'gray.200');
    // const textColor = useColorModeValue('themeLight.logo', 'themeDark.logo');
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
        <Flex px={{ base: '24px', md: '27px', lg: '30px' }} py={4}  w='full' bg={bgColor} boxShadow='md' align="center" justify="space-between">
            
            <Box align='center' width={{ base: '95%', md: '50%', lg: '60%' }} h={{ base: '50%', md: '85vh', lg: '85vh' }} mt='0'>
                <Box width='90%'>
                    <Flex align='center' justify='center'>
                        <Input placeholder='Youtube video url' borderRadius='none' width="70%" h={{base: '20px', md: '29px', lg: '40px'}} fontSize={{base: '10px', md: '15px', lg: '20px'}} onChange={(e) => props.setUrl(e.target.value)} required/>
                        <Button onClick={(e) => props.getVideo()} borderRadius='none' bg={searchColor} width='70px' align='center' py={1} h={{ base: '20px', md: '29px', lg: '40px' }} _hover={{ bg: 'gray.400' }}>
                            <Icon as={RiSearch2Line} w={{ base: '29px', md: '32px', lg: '35px' }} h={{ base: '20px', md: '24px', lg: '27px' }} />
                        </Button>
                    </Flex>
                    
                </Box>
                <Box>
                    <Bounce left>
                        <Flex width="90%" mt={2} >
                            <Box id="player"></Box>
                        </Flex>
                    </Bounce>            
                 
            </Box>
            </Box>

            <Center >
                <Divider orientation='vertical' />
            </Center>
            <Box align='center' width={{ base: '95%', md: '40%', lg: '30%' }} h={{ base: '50%', md: '85vh', lg: '85vh' }} >
            {displayProp ? 
            <Box>
            <Bounce bottom>                                        
                <Box   h={{ base: '150px', md: '250px', lg: '350px' }} w='100%' borderLeft='1px' borderBottom='1px' borderColor='gray.200' boxShadow='base'>
                    <Image src='/images/video.png' alt='Topic' />
                </Box >                   
                </Bounce> 
                <Bounce right>
                    <Box py={4} align='center' justify="center" w='full'>
                        <Text fontSize={{ base: '16px', md: '20px', lg: '24px' }} px={{base: '24px', md: '27px', lg: '30px'}}>How it Works</Text>
                        <Divider orientation='horizontal'></Divider>
                        <Text fontSize={{ base: '16px', md: '20px', lg: '24px' }} px={{base: '24px', md: '27px', lg: '30px'}}>Paste the link of the Youtube video</Text>
                        <Text fontSize={{ base: '16px', md: '20px', lg: '24px' }} px={{base: '24px', md: '27px', lg: '30px'}}>Input a word or sentence in the video to search for their frame location</Text>
                    </Box>
                </Bounce>
                </Box>
                : 
            
                 <Box width='90%' >
                    <Flex>
                        <Input placeholder='Word to search' borderRadius='none' width="70%" h={{base: '20px', md: '29px', lg: '40px'}} fontSize={{base: '10px', md: '15px', lg: '20px'}} onChange={(e) => props.setWord(e.target.value)} required/>
                        <Button onClick={(e) =>{
                            props.setwordSearch(true)
                             props.fetchCaption() }} borderRadius='none' bg={searchColor} width='70px' align='center' py={1} h={{ base: '20px', md: '29px', lg: '40px' }} _hover={{ bg: 'gray.400' }}>
                            <Icon as={RiSearch2Line} w={{ base: '29px', md: '32px', lg: '35px' }} h={{ base: '24px', md: '27px', lg: '30px' }} />
                        </Button>
                    </Flex>

                    { wordSearchProp ? <>
                        {dataProp ? 
                        <SearchList data={props.data} id={props.id} setSeekClick={props.setSeekClick} getIndex={props.getIndex}/> : 
                    <Box>
                     
                     <>
                     <Bounce bottom>                                                        
                        <Box   h={{ base: '150px', md: '250px', lg: '350px' }} w='100%' borderLeft='1px' borderBottom='1px' borderColor='gray.200' boxShadow='base'>
                            <Image src='/images/no_data.png' alt='Searched word is not in the video' />
                        </Box >               
                        </Bounce> 
                        <Bounce right>
                            <Box py={4} align='center' justify="center" w='full'>
                                <Text fontSize={{ base: '16px', md: '20px', lg: '24px' }} px={{base: '24px', md: '27px', lg: '30px'}}>Searched word not in the video, check and try again</Text>
                            </Box> 
                        </Bounce></>     
                    
                        {/* : <Box></Box>   }  */}
                        </Box> }</> : <></>
                    }
                    </Box>
             }
        </Box>
        </Flex >
        
    )
        
}
export default Layout