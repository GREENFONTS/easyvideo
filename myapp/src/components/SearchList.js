import React from 'react';

function SearchList(props){
    return (
        <div>{
               props.data.map((ele) => {
                    return(
                        <div key={props.data.indexOf(ele) + 1} className='row p-3' style={{"fontSize": '0px'}} onClick={() => {
                            props.getIndex(props.data.indexOf(ele))
                            props.setSeekClick(true)
                        }
                        }>
                            <iframe className='col-6' type="text/html" width="100" height="100" title='Youtube Video'
                        src={`https://www.youtube.com/embed/${props.id}?start=${Math.ceil(ele.time)}`}
                        ></iframe>
                            <h1 className='col-6 justify-content'>Frame {props.data.indexOf(ele)}</h1>                        
                        </div>
                    )
                })
            }
        </div>
    )
}
export default SearchList;
