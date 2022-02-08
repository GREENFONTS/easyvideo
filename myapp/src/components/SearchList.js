import React from 'react';
import { Flex, Text} from '@chakra-ui/react';

function SearchList(props){
    console.log('enetered searchlist')
    return (
        <>{
               props.data.map((ele) => {
                    return(
                        <Flex mt={3} w='full' key={props.data.indexOf(ele) + 1} onClick={() => {
                            props.getIndex(props.data.indexOf(ele))
                            props.setSeekClick(true)
                        }
                        }>
                            <iframe type="text/html" width="300" height="150" title='Youtube Video' aria-controls='false'
                        src={`https://www.youtube.com/embed/${props.id}?start=${Math.ceil(ele.time)}`}
                        ></iframe>
                            <Text >Frame {props.data.indexOf(ele)}</Text>                        
                        </Flex>
                    )
                })
            }
        </>
    )
}
export default SearchList;
