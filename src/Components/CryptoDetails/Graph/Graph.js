import React from 'react'
import './Graph.css'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { formatDate } from '../../../Helpers/formatDate';

export const Graph = ({ indicator }) => {

    let formattedData = indicator.serie.map(item => {
        const { fecha, valor } = item
        return {
            fecha: formatDate(fecha).substring(0,5),
            valor: valor
        }
    })

    return (
        <LineChart width={700} height={300} data={formattedData.reverse()} margin={{ top: 5, right: 5, bottom: 5, left: 22 }}>
            <Line type="monotone" dataKey="valor" stroke="#8884d8" />
            <XAxis dataKey="fecha" />
            <YAxis dataKey="valor" domain={['dataMin', 'dataMax']}/>
            <Tooltip />
        </LineChart>
    )
}