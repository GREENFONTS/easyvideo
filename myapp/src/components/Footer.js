import { Box, Flex, Icon, Image, Text, useColorModeValue} from '@chakra-ui/react'
import { FaInstagram } from 'react-icons/fa'
import { BsTwitter, BsLinkedin } from 'react-icons/bs'
import React from 'react'
import { Link } from '@chakra-ui/react'
import { VscGithub } from 'react-icons/vsc'

const Footer = () => {
    const bgColor = useColorModeValue('themeLight.bg', 'themeDark.bgBody')
    const bgInstagram = useColorModeValue('red', 'white')
    const bgGithub = useColorModeValue('black', 'white')
    const bgLinkedIn = useColorModeValue('#0077b5', 'white')
    const bgTwitter = useColorModeValue('#1DA1F2', 'white')

    return (
        <Flex px='4px' py='6px' h='30px' w='full' bg={bgColor} borderTop='1px' borderColor='gray.200' boxShadow='sm' align="center" justify="space-between" position='sticky'>
            <Flex paddingLeft='10px' align="center" justify="center">
                <Flex align="center" justify="center">
                    <Text textAlign='center' paddingRight='10px' fontSize={{ base: '10px', md: '12px', lg: '14px' }}>© 2022</Text>
                    <Box w={{ base: '10px', md: '13px', lg: '14px' }} h={{ base: '10px', md: '13px', lg: '14px' }} marginRight='10px'>
                        <Image w='100%' h='100%' src='/images/flag.png' />
                    </Box>
                </Flex>
                <Text fontSize={{ base: '10px', md: '12px', lg: '14px' }}>Godwill Onyewuchi Humphrey</Text>
            </Flex>
            <Flex align="center" justify="center" paddingRight='10px'>
                <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                    <Link href='https://github.com/GREENFONTS' isExternal _focus={{ outline: 'none' }}>
                        <Icon as={VscGithub} color={bgGithub} w={{ base: '12px', md: '13px', lg: '14px' }} h={{ base: '12px', md: '13px', lg: '14px' }} />
                    </Link>
                </Box>
                <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                    <Link href='https://www.instagram.com/onyewuchigodwill/' isExternal _focus={{ outline: 'none' }}>
                        <Icon as={FaInstagram} color={bgInstagram} w={{ base: '12px', md: '13px', lg: '14px' }} h={{ base: '12px', md: '13px', lg: '14px' }} />
                    </Link>
                </Box>
                <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                    <Link href='https://twitter.com/GODWILLONYEWUC1' isExternal _focus={{ outline: 'none' }}>
                        <Icon as={BsTwitter} color={bgTwitter} w={{ base: '12px', md: '13px', lg: '14px' }} h={{ base: '12px', md: '13px', lg: '14px' }} />
                    </Link>
                </Box>
                <Box paddingRight='10px' _hover={{ transform: 'scale(1.05)', cursor: "pointer" }}>
                    <Link href='https://www.linkedin.com/in/godwill-onyewuchi-6746621b4/' isExternal _focus={{ outline: 'none' }}>
                        <Icon as={BsLinkedin} color={bgLinkedIn} w={{ base: '12px', md: '13px', lg: '14px' }} h={{ base: '12px', md: '13px', lg: '14px' }} />
                    </Link>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Footer