import { useParams } from 'react-router-dom'

require("./css.css");
export default function CreateInvoice(props) {
    const { id, name } = useParams();
    const { data } = props;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${day}`;

    const getGenerateId = () => {
        return Math.round(Math.random() * 1000 + 1);
    }

    const customerPackages = data.packages.filter(p => p.customerid === +id);

    let totalPrice = 0, weight = 0;
    customerPackages.forEach(element => {
        totalPrice += element.price;
        weight += +(element.weight.substring(0, element.weight.length - 2));

    });

    return (
        <div className='div'>
            <div className=' header'>
                <div className='b'>
                    <label>{todayDate}</label><br></br>
                    <label className='no'>{name}</label>
                </div>
                <div className='a'>
                    <label className='invoice'>Invoice</label><br />
                    <label className='no'>No.{getGenerateId()}</label>
                </div>
            </div>
            <div className='row'>
                <body className='body'>
                    <table className='tble'>
                        <tr>
                            <th>Id </th>
                            <th>Weight</th>
                            <th>Price</th>
                        </tr>
                        {customerPackages.map((row) => {
                            return (
                                <tr>
                                    <td>{row.id}</td>
                                    <td>{row.weight}</td>
                                    <td >{row.price}</td>
                                </tr>

                            );
                        })}
                        <tr>
                            <th></th>
                            <th>{weight} kg</th>
                            <th>total:{totalPrice}</th>
                        </tr>
                    </table>
                    <p>You received {customerPackages.length} packages<br></br>Thank you for using our services</p>
                </body>

            </div>

        </div>
    )
}

