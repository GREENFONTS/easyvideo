import React from 'react';
import { Link as ReactLink } from "react-router-dom";
import { Box, Flex, Icon, Button, Center, Divider, Image, Link, LinkBox, Text, VStack, LinkOverlay, useDisclosure, useMediaQuery, Input, } from '@chakra-ui/react';
import { RiSearch2Line } from 'react-icons/ri';
import { BiGitBranch, BiMoon } from 'react-icons/bi';
import { ImSun } from 'react-icons/im';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import Tilt from 'react-parallax-tilt';
import Bounce from 'react-reveal/Bounce';

const Layout = (props) => {

    const [isLargerThan770] = useMediaQuery('(min-width: 770px)')
    const [isLargerThan500] = useMediaQuery('(min-width: 500px)')
    const [isLargerThan400] = useMediaQuery('(min-width: 400px)')
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const iconColor = useColorModeValue('themeLight.icon', 'themeLight.icon');
    const searchColor = useColorModeValue('gray.200', 'gray.200');
    const textColor = useColorModeValue('themeLight.logo', 'themeDark.logo');
    let displayProp;
    if(props.id === null || undefined){
        displayProp = true
    }
    else{
        displayProp = false
    }
    console.log(displayProp)
    return (
        <Flex px={{ base: '24px', md: '27px', lg: '30px' }} py={2} h='90vh' w='full' bg={bgColor} boxShadow='md' align="center" justify="space-between">
            
            <Box align='center' width={{ base: '95%', md: '50%', lg: '60%' }} h={{ base: '50%', md: '85vh', lg: '85vh' }}>
                <Box width='90%' >
                    <Flex>
                        <Input placeholder='Youtube video url' borderRadius='none' width="70%" h={{base: '29px', md: '35px', lg: '50px'}} fontSize={{base: '10px', md: '15px', lg: '25px'}} onChange={(e) => props.setUrl(e.target.value)} required/>
                        <Button onClick={(e) => props.getVideo()} borderRadius='none' bg={searchColor} width='70px' align='center' py={1} h={{ base: '29px', md: '35px', lg: '50px' }} _hover={{ bg: 'gray.400' }}>
                            <Icon as={RiSearch2Line} w={{ base: '29px', md: '32px', lg: '35px' }} h={{ base: '24px', md: '27px', lg: '30px' }} />
                        </Button>
                    </Flex>
                    
                </Box>
                {displayProp ? <Bounce bottom>
                    <Flex width="90%" mt={3} align='center' justify="center">
                    
                        <Box  h={{ base: '150px', md: '250px', lg: '350px' }} w={{ base: '50%', md: '50%', lg: '50%' }} borderLeft='1px' borderBottom='1px' borderColor='gray.200' boxShadow='base'>
                            <Image src='/images/video.png' alt='Topic' />
                        </Box >
                        <Flex align='center' justify="center" w={{ base: '50%', md: '50%', lg: '50%' }}>
                            <Text fontSize={{ base: '16px', md: '20px', lg: '24px' }}>Copy and Paste the link of the youtube video you wanna scan and let's start seeking for words</Text>
                        </Flex>
                    
                    </Flex>
                    
                </Bounce> :
                <Flex width="90%" mt={2}>
                    <div id="player"></div>
                </Flex> }
            </Box>

            <Center height='85vh'>
                <Divider orientation='vertical' />
            </Center>


            <Box align='center' width={{ base: '95%', md: '40%', lg: '30%' }} h={{ base: '50%', md: '85vh', lg: '85vh' }} >
                 <Box width='90%' >
                    <Flex>
                        <Input placeholder='Word to search' borderRadius='none' width="70%" h={{base: '29px', md: '35px', lg: '50px'}} fontSize={{base: '10px', md: '15px', lg: '25px'}} onChange={props.setId} required/>
                        <Button borderRadius='none' bg={searchColor} width='70px' align='center' py={1} h={{ base: '29px', md: '35px', lg: '50px' }} _hover={{ bg: 'gray.400' }}>
                            <Icon as={RiSearch2Line} w={{ base: '29px', md: '32px', lg: '35px' }} h={{ base: '24px', md: '27px', lg: '30px' }} />
                        </Button>
                    </Flex>
                    </Box>
            </Box>
        </Flex >
        
    )
        
}
export default Layout