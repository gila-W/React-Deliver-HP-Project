import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
require("./css.css");

export default function Packages(props) {

    const { updateData, data: appData } = props;
    const sortedPackages = appData.packages.toSorted((package1, package2) => package1.shippingOrder - package2.shippingOrder)

    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState("");
    const [customerid, setCustomerId] = useState("");
    const [weight, setWeight] = useState("");
    const [price, setPrice] = useState("");
    const [shippingOrder, setShippingOrder] = useState(0);

    const getName = (customerid) => {
        return appData.customers.filter(customer => customer.id === customerid)[0]?.name;
    }

    const handleMoveUp = (index) => {
        
        if (index > 0) {
            const shippingOrder = { ...sortedPackages[index], shippingOrder: sortedPackages[index - 1].shippingOrder };
            const firstOrder = { ...sortedPackages[index - 1], shippingOrder: sortedPackages[index].shippingOrder };
            const updatedOrder = appData.packages.map(data => {
                if (data.id === shippingOrder.id)
                    return shippingOrder;
                if (data.id === firstOrder.id)
                    return firstOrder;
                return data;
            })
            updateData(prev => ({ ...prev, packages: updatedOrder }))
        }

    };

    const handleMoveDown = (index) => {
        if (index < appData.packages.length - 1) {
            const shippingOrder = { ...sortedPackages[index], shippingOrder: sortedPackages[index + 1].shippingOrder };
            const firstOrder = { ...sortedPackages[index + 1], shippingOrder: sortedPackages[index].shippingOrder };
            const updatedOrder = appData.packages.map(data => {
                if (data.id === shippingOrder.id)
                    return shippingOrder;
                if (data.id === firstOrder.id)
                    return firstOrder;
                return data;
            })
            updateData(prev => ({ ...prev, packages: updatedOrder }))
        }
    };

    const handleDelete = (id) => {
        updateData(prev => ({
            ...prev,
            packages: prev.packages.filter(pkg => pkg.id !== id)
        }));
    };
    
    const handleAddCustomer = (newcpackage) => {
       
        setShippingOrder(shippingOrder + 1);
        updateData(prevState => ({
            ...prevState,
            packages: [...prevState.packages, newcpackage]
        }));

        setShowModal(false);
        setPrice('');
        setWeight('');
        setWeight('');
        setCustomerId('');
        setId('');
    
    }
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() => setShowModal(true)}
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                >
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedPackages.map((row, index) => {
                            return (
                                <TableRow
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{getName(row.customerid)}</TableCell>
                                    <TableCell>{row.weight}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => handleDelete(row.id)}>Delete</Button>
                                        <IconButton
                                            size="large"
                                            edge="start"
                                            aria-label="menu"
                                            onClick={() => handleMoveUp(index)}

                                        >
                                            <ArrowDropUp />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleMoveDown(index)}
                                            size="large"
                                            edge="start"
                                            aria-label="menu"
                                        >
                                            <ArrowDropDown />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {showModal && (<div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>    &times;    </span>
                    <h2>Add Customer</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleAddCustomer({ id: 'pak'+id, weight:weight+'kg', customerid: +customerid, price: +price, shippingOrder }); }} >
                        <label htmlFor="id">Id:</label>
                        <input type="text" id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} required />

                        <label htmlFor="Weight">Weight:</label>
                        <input type="text" id="weight" name="weight" value={weight} onChange={(e) => setWeight(e.target.value)} required />

                        <label htmlFor="Customer Id">Customer ID:</label>
                        <input type="text" id="Customerid" name="Customerid" value={customerid} onChange={(e) => setCustomerId(e.target.value)} required />

                        <label htmlFor="Price">Price:</label>
                        <input type="text" id="pruce" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />

                        <label htmlFor="Price">Shipping order:</label>
                        <label name="shippingOrder">{shippingOrder}</label>

                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>)}
        </div>
    )
}

