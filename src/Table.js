import React from 'react';
import Tbody from './Tbody'

const Thead = ({isDetails})=>{
    return(
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">{isDetails? "Numer": "Waluta"}</th>
                <th scope="col">{isDetails? "Data": "Kod"}</th>
                <th scope="col">Kupno</th>
                <th scope="col">Sprzedaż</th>                        
            </tr>
        </thead>
    )
}

const Table = ({data, isDetails}) => {
    return(
        <div>
            <table className="table table-hover">
                <Thead isDetails={isDetails}/>
                <Tbody data={data}/>
            </table>
        </div>
    )
}

export default Table;
