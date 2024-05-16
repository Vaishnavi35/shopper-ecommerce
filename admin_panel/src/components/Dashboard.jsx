import ProgressBar from "react-bootstrap/ProgressBar";
import { PieChart, Pie, BarChart, Bar, Cell, ResponsiveContainer,Tooltip,  LineChart, Line, XAxis, YAxis  } from 'recharts';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ordered_products } from "../../util";
import { dashboard } from "../../util";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectLeftMenu } from "../slices/leftMenuSlice";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = 734;
    const orders_left = 266;
    const total_sales = 2400;
    const customers = 2571;
    const orders_columns = Object.keys(ordered_products[0] || {});

    const best_selling = [
        {
            name: "Classic Monochrome Tees",
            amount : 940
        },
        {
            name: "Monochromatic Wardrobe",
            amount : 790
        },
        {
            name: "Essential Neutrals",
            amount : 740
        }
    ];

    const best_selling_colors = ['#4078FF', '#728FFF', '#A8B2FF'];

    const goToOrders = () => {
        navigate('dataTable/orders');
        dispatch(selectLeftMenu('orders'));
    }

    return(
        <div className="dashboard tw-p-10 tw-grid tw-gap-10  tw-justify-center tw-items-center tw-grid-cols-3 tw-bg-[#ECECEC]" style={{ gridTemplateRows: '187px auto' }}>
            <div className="tw-w-full tw-border-[#E9E9EB] tw-border-2 tw-rounded-lg tw-p-5 tw-h-full tw-bg-white">
            <div className=' tw-grid tw-grid-cols-2 tw-justify-between'>
                            <div>
                                <div className='tw-text-base tw-font-semibold'>Total Sales</div>
                                <div className='grey_color tw-text-xs tw-font-medium'>THIS MONTH</div>
                            </div>
                            <div className=' tw-text-right tw-text-2xl tw-font-bold'>${total_sales.toLocaleString()}</div>
                        </div>
                <div style={{width: '100%', height: 'calc(100% - 40px)'}}>
                <ResponsiveContainer width="100%" height="100%" >
                <BarChart  data={dashboard}>
                    <XAxis dataKey="day" hide="true"/>
                    <YAxis  hide="true"/> 
                    <Tooltip labelFormatter={(val) => `Day${val}`} formatter={(value, name) => [`$${value}`, name === 'sales_amount' ? 'Sales' : name]}/>
                    <Bar dataKey="sales_amount" fill="#4078FF" name="Sales" />
                </BarChart>
                </ResponsiveContainer>
                    {/* <Bar data={data} options={options}/> */}
                </div>
            </div>
            {/* <div> */}
                <div className="tw-w-full tw-border-[#E9E9EB] tw-border-2 tw-rounded-lg tw-p-5 tw-h-full tw-bg-white">
                    {/* <div className='tw-grid' style={{ gridTemplateRows: '40px minmax(0, 1fr)' }}> */}
                        <div className=' tw-grid tw-grid-cols-2 tw-justify-between'>
                            <div>
                                <div className='tw-text-base tw-font-semibold'>Customers</div>
                                <div className='grey_color tw-text-xs tw-font-medium'>THIS MONTH</div>
                            </div>
                            <div className=' tw-text-right tw-text-2xl tw-font-bold'>{customers.toLocaleString()}</div>
                        </div>
                        <div style={{ width: '100%', height: 'calc(100% - 40px)'}}>
                            <ResponsiveContainer width='100%' height="100%">
                                <LineChart  data={dashboard} className="lineChart" >
                                    <Line type="monotone" dataKey="customers" stroke="#4078FF" name="Customers"/>
                                    <XAxis dataKey="day" hide="true"/>
                                    <YAxis hide="true"/>
                                    <Tooltip labelFormatter={(val) => `Day${val}`}/>
                                </LineChart>
                        </ResponsiveContainer>
                            {/* <Line data={lineData} options={lineOptions}/> */}
                        </div>
                    {/* </div> */}
                </div>
            {/* </div> */}
            {/* <div> */}
                <div className="tw-w-full tw-border-[#E9E9EB] tw-border-2 tw-rounded-lg tw-p-5 tw-h-full tw-bg-white">
                    <div style={{width: '100%', height: '100%'}} className='tw-grid tw-grid-rows-[auto,auto,5px]'>
                        <div className=' tw-grid tw-grid-cols-2 tw-justify-between'>
                            <div>
                                <div className='tw-text-base tw-font-semibold'>Orders</div>
                                <div className='grey_color tw-text-xs tw-font-medium'>MONTHLY GOALS : 1,000</div>
                            </div>
                            <div className=' tw-text-right tw-text-2xl tw-font-bold'>{orders}</div>
                        </div>
                        <div className='grey_color tw-text-xs tw-self-end tw-mb-1 tw-font-medium'>{orders_left} Left</div>
                        <ProgressBar animated now={orders} className='tw-h-2 tw-self-end ' max={1000} min={0}/>
                    </div>
                </div>
            {/* </div> */}
            <div className='tw-w-full tw-border-[#E9E9EB] tw-border-2 tw-rounded-lg tw-h-full tw-bg-white tw-grid' style={{ gridTemplateRows: '78px minmax(0, 1fr)' }}>
                <div className='tw-border-[#E9E9EB] tw-border-b tw-p-5 '>
                    <div className='tw-text-base tw-font-semibold tw-mb-2'>Best Selling</div>
                    <div className='grey_color tw-text-xs tw-font-medium'>THIS MONTH</div>
                </div>
                <div className='tw-p-5 '>
                    <div className='tw-text-2xl tw-font-bold tw-mb-3'>${total_sales.toLocaleString()} <span className='grey_color tw-text-sm tw-font-medium'> --- Total Sales</span></div>
                    {
                        best_selling.map((v,i) => {
                            return(
                                <div key={`best_selling_${v.name}`} className='border-[#E6E7E8] tw-h-7 tw-mb-3 border tw-rounded-full tw-text-xs tw-text-center grey_color tw-flex tw-gap-1 tw-justify-center tw-items-center'>{v.name} —-  <span className='tw-text-black tw-font-semibold'>${v.amount.toLocaleString()} Sales</span></div>
                            )
                        })
                    }
                    <div className='tw-flex tw-justify-center'>
                        <PieChart width={150} height={150}>
                            <Pie data={best_selling} dataKey="amount" 
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          fill="#8884d8">
                                {best_selling.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={best_selling_colors[index % best_selling_colors.length]} />
                                        ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                </div>
            </div>
            <div className='tw-col-span-2 tw-w-full tw-border-[#E9E9EB] tw-border-2 tw-rounded-lg tw-p-5 tw-h-full tw-bg-white'>
                <div className='tw-flex tw-gap-5 tw-bg-white tw-pb-5 tw-items-center'>
                    <div className='tw-text-base tw-font-semibold'>Recent Orders</div>
                    <button to="dataTable/orders" onClick={goToOrders} className='grey_color tw-bg-[#ECECEC] tw-h-7 tw-w-20 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-text-xs tw-font-medium'>View All</button>
                </div>
                <DataTable value={ordered_products} tableStyle={{ minWidth: '50rem', height: '100%', background: 'white' }} >
                    {
                        orders_columns.map((col,i) => {
                            return(
                                <Column key={`order_dt_col_${col}`} field={col} header={col.replace(/^\w/,c => c.toUpperCase())}></Column>
                            )
                        })
                    }
                </DataTable>
            </div>
        </div>
    )
}

export default Dashboard;
