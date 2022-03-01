import React from 'react';
import { Flex, Text, Box} from '@chakra-ui/react';
import Fade from 'react-reveal/Fade';

function SearchList(props){
    
    return (
        <>{
               props.data.map((ele) => {
                    return(
                        <Fade key={props.data.indexOf(ele) + 1}>
                            <Flex display={{ md: 'flex'}} mt={3} w='full'  onClick={() => {
                            props.getIndex(props.data.indexOf(ele))
                            props.setSeekClick(true)
                        }
                        } borderLeft='1px' borderBottom='1px' borderColor='gray.200' boxShadow='base'>
                            <Box>
                            <iframe type="text/html" width="300" height="150" title='Youtube Video' aria-controls='false'
                        src={`https://www.youtube.com/embed/${props.id}?start=${Math.ceil(ele.time)}`}
                        ></iframe>
                            </Box>
                            <Box justifyContent='center' width={['100%', '100%', '50%']} mt={3}>
                            <Text align='center' fontSize={{base: '17px', md: '23px', lg: '30px'}}>Frame {props.data.indexOf(ele) + 1}</Text> 
                            </Box>
                                                   
                        </Flex>
                        </Fade>
                        
                    )
                })
            }
        </>
    )
}
export default SearchList;
