import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";

export default function Customer(props) {
    const history = useHistory();
    const { updateData, data } = props;

    const createInvoice = (id, name) => {
        history.replace(`/createInvoice/id/${id}/name/${name}`);
    }

    const deleteCustomer = (id) => {

        const updatedCustomers = data.customers.filter(customer => customer.id !== id);
        updateData(prevState => ({
            ...prevState,
            customers: updatedCustomers
        }));
    };
    
    return (
        <div><TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.customers.map((row) => {
                        return (
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => createInvoice(row.id, row.name)}>Create Invoice</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => deleteCustomer(row.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer></div>
    )
}
