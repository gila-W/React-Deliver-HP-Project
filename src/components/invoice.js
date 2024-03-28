import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
require("./css.css");

export default function Invoice(props) {

const data = props.data.customers;

const filterData = data?.filter(d => props.data.packages.some(pack => pack.customerid === d.id));

const customerWithPack = filterData?.map(d => {

  let price = 0, weight =0;
  props.data.packages.forEach(element => {
    if (element.customerid === d.id){
      price += element.price;
      weight += +(element.weight.substring(0, element.weight.length -2));
    }

  });
  return {
    id: d.id,
    weight: weight + 'kg',
    price: price,
    name: d.name
  };
});

  return (
    <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Total Weight</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerWithPack?.map((row) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                   >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.weight}</TableCell>
                        <TableCell>{row.price}</TableCell>
                  </TableRow>

                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}
