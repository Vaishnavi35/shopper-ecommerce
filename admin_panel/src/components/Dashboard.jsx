import { Chart, registerables } from 'chart.js';
// import {  Bar } from "react-chartjs-2";
import ProgressBar from "react-bootstrap/ProgressBar";
// import {} from 'recharts';
import { PieChart, Pie, Sector, Legend, BarChart, Bar, Cell, ResponsiveContainer,Tooltip,  LineChart, Line, CartesianGrid, XAxis, YAxis  } from 'recharts';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ordered_products } from "../../util";
  


const Dashboard = () => {
    Chart.register(...registerables);
    const orders = 734;
    const orders_left = 266;
    const total_sales = 2400;
    const customers = 2571;
    const orders_columns = Object.keys(ordered_products[0] || {});
    const Rdata = [
        { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
        // Add more records as needed
      ];
    const labels = [
        'day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10',
        'day11', 'day12', 'day13', 'day14', 'day15', 'day16', 'day17', 'day18', 'day19', 'day20',
        'day21', 'day22', 'day23', 'day24', 'day25', 'day26', 'day27', 'day28', 'day29', 'day30', 'day31'
      ];

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: true,
                text: 'Total Sales\nTHIS MONTH\n $54546',
                // font: {
                //     size: 16
                // },
                callback: (context) => {
                    return 'Total Sales\nTHIS MONTH\n $54546';
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    display: false // Hide x-axis ticks
                }
            }
        }
    };
      
    const data = {
        labels : labels,
        datasets : [
            {
                label : "Weekly report",
                backgroundColor: '#4078FF',
                borderColor: '#4078FF',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [65, 59, 80, 81, 56, 55, 40, 45, 50, 30, 20, 70, 75, 85, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10]

            }
        ]
    }

    const BarData = [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
        { name: 'C', value: 30 },
        { name: 'D', value: 40 },
        { name: 'E', value: 50 },
      ];

    const lineData = 
        {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [
              {
                label: '',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#4078FF',
                tension: 0.1
              }
            ]
        };

    const lineOptions = {
        plugins: {
            title: {
              display: false,
            }
          },
          scales: {
            x: {
              display: false // Hide x-axis labels
            }
          }
    };

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


    return(
        <div className="tw-p-10 tw-grid tw-gap-10 dashboard tw-justify-center tw-items-center tw-grid-cols-3 tw-bg-[#F6F6F6]" style={{ gridTemplateRows: '30% auto' }}>
            <div className="tw-w-full tw-border-[#E9E9EB] tw-border-2 tw-rounded-lg tw-p-5 tw-h-full tw-bg-white">
            <div className=' tw-grid tw-grid-cols-2 tw-justify-between'>
                            <div>
                                <div className='tw-text-base tw-font-semibold'>Total Sales</div>
                                <div className='grey_color tw-text-xs tw-font-medium'>THIS MONTH</div>
                            </div>
                            <div className=' tw-text-right tw-text-2xl tw-font-bold'>{total_sales.toLocaleString()}</div>
                        </div>
                <div style={{width: '100%', height: 'calc(100% - 40px)'}}>
                <ResponsiveContainer width="100%" height="100%" >
                <BarChart  data={BarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* <XAxis dataKey="uv" />
                    <YAxis /> */}
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#4078FF" />
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
                                <LineChart  data={Rdata}  >
                                    <Line type="monotone" dataKey="uv" stroke="#4078FF" />
                                    <CartesianGrid stroke="#ccc" />
                                    {/* <XAxis dataKey="name" />
                                    <YAxis /> */}
                                    <Tooltip />
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
                    <div className='tw-text-2xl tw-font-bold tw-mb-3'>${total_sales.toLocaleString()} <span className='grey_color tw-text-sm tw-font-medium'>-- Total Sales</span></div>
                    {
                        best_selling.map((v,i) => {
                            return(
                                <div key={`best_selling_${v.name}`} className='border-[#E6E7E8] tw-h-7 tw-mb-3 border tw-rounded-full tw-text-xs tw-text-center tw-h-6 grey_color tw-flex tw-gap-1 tw-justify-center tw-items-center'>{v.name} —-  <span className='tw-text-black'>${v.amount.toLocaleString()} Sales</span></div>
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
                    <button className='grey_color tw-bg-[#F6F6F6] tw-h-7 tw-w-20 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-text-xs tw-font-medium'>View All</button>
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
