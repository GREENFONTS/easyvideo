import React from 'react';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader,DrawerOverlay, DrawerContent, Link, Text, Box, LinkBox, HStack,
    LinkOverlay, VStack, Icon, Button, Flex, Image, useColorModeValue} from '@chakra-ui/react'
import { Link as ReactLink } from "react-router-dom"
import Tilt from 'react-parallax-tilt';
import { RiYoutubeFill } from 'react-icons/ri';
import {VscGithub} from 'react-icons/vsc';
import { FaInstagram } from 'react-icons/fa';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';
import Fade from 'react-reveal/Fade';

const DrawerComponent = (props) => {

    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const logoColor = useColorModeValue('red.500', 'red.500');
    const bgInstagram = useColorModeValue('red', 'white');
    const bgGithub = useColorModeValue('black', 'white');
    const bgLinkedIn = useColorModeValue('#0077b5', 'white');
    const bgTwitter = useColorModeValue('#1DA1F2', 'white')


   return (
        <Drawer
            isOpen={props.isOpen}
            placement='right'
            onClose={props.onClose}
        >
            <DrawerOverlay />
            <DrawerContent backgroundColor={bgColor}>
                <DrawerHeader>
                    <Flex w='100%' align='center' justify='space-between'>
                        <Box alignItems='center'>
                            <LinkBox>
                                <HStack _hover={{ cursor: "pointer" }}>
                                    <LinkOverlay as={ReactLink} to='/' _focus={{ outline: 'none' }}>
                                        <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20}><Icon as={RiYoutubeFill} w={35} h={35} color={logoColor} /></Tilt>
                                    </LinkOverlay>
                                    <VStack>
                                        <Text fontWeight="bold" lineHeight='10px' color={logoColor}>WORD</Text>
                                        <Text fontWeight="bold" lineHeight='10px' color={logoColor}>SEARCH</Text>
                                    </VStack>
                                </HStack>
                            </LinkBox>
                        </Box>
                        <Button h={10} w={10} variant='outline' m={3} onClick={props.onClose}>
                            x
                        </Button>
                    </Flex>
                </DrawerHeader>

                <DrawerBody>
                    <Fade right>
                        <Link href='https://www.youtube.com' target='_blank' mb='10px' _hover={{ transform: 'scale(1.02)', cursor: "pointer" }} fontWeight='500' >Youtube</Link>
                    </Fade>
                    <Fade bottom>
                        <Box mb='10px' _hover={{ transform: 'scale(1.02)', cursor: "pointer" }}>
                            <Link href='https://github.com/GREENFONTS/easyvideo' target='_blank' _hover={{ cursor: "pointer" }} fontWeight='500' >Fork Repo</Link>
                        </Box>
                    </Fade>
                </DrawerBody>

                <DrawerFooter>
                    <Flex direction='column' px='4px' py='6px' h='100%' w='100%' bg={bgColor} borderTop='1px' borderColor='gray.200' align="center" justify="space-between" >
                        <Flex paddingLeft='10px' align="center" justify="center">
                            <Text paddingRight='10px'>© 2022</Text>
                            <Box w='15px' h='15px' marginRight='10px'>
                                <Image w='100%' h='100%' src='/images/flag.png' />
                            </Box>
                        </Flex>
                        <Text >Godwill Onyewuchi Humphrey</Text>
                        <Flex align="center" justify="center" paddingRight='10px'>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <Link href='https://github.com/GREENFONTS' isExternal _focus={{ outline: 'none' }}><Icon as={VscGithub} color={bgGithub} /></Link>
                            </Box>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <Link href='https://www.instagram.com/onyewuchigodwill/' isExternal _focus={{ outline: 'none' }}><Icon as={FaInstagram} color={bgInstagram} /></Link>
                            </Box>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <Link href='https://twitter.com/GODWILLONYEWUC1' isExternal _focus={{ outline: 'none' }}><Icon as={BsTwitter} color={bgTwitter} /></Link>
                            </Box>
                            <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                                <Link href='https://www.linkedin.com/in/godwill-onyewuchi-6746621b4/' isExternal _focus={{ outline: 'none' }}><Icon as={BsLinkedin} color={bgLinkedIn} /></Link>
                            </Box>
                        </Flex>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerComponent