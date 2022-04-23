import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { unitValue } from '../../../Helpers/UnitValue';
import { formatDate } from '../../../Helpers/formatDate';

export const List = ({ indicator }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell >Valor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {indicator.serie.map((serieDate, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{formatDate(serieDate.fecha)}</TableCell>
                            <TableCell >{unitValue(indicator.unidad_medida, serieDate.valor)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
