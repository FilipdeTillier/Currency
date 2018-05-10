import React from 'react';

const Tbody = ({data}) =>{
    return(
        <tbody>
            <ListItems data={data}/>
        </tbody>
    )
}

const ListItems = ({data}) => data.map((value, index) => {return <Tr 
    data={value}
    index={index + 1} 
key={(value.ask*value.bid).toString()*Math.floor(Math.random()*9999)}/>})

const Tr = ({data, index}) => {
    return(
        <tr>
            <th scope="row">{index}</th>
            {Object.keys(data).map(el=><td key={Math.floor(Math.random()*9999999)}>{data[el]}</td>)}
        </tr>
    )
}   

export default Tbody;
