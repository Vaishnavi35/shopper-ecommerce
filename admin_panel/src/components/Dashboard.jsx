import { Chart, registerables } from 'chart.js';
import { Line, Bar } from "react-chartjs-2";

const Dashboard = () => {
    Chart.register(...registerables);
    const labels = [
        'day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10',
        'day11', 'day12', 'day13', 'day14', 'day15', 'day16', 'day17', 'day18', 'day19', 'day20',
        'day21', 'day22', 'day23', 'day24', 'day25', 'day26', 'day27', 'day28', 'day29', 'day30', 'day31'
      ];

    const options = {
        plugins: {
            
            title: {
                display: true,
                text: 'Total Sales\nTHIS MONTH\n $54546',
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
                label : "Sales",
                backgroundColor: '#4078FF',
                borderColor: '#4078FF',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [65, 59, 80, 81, 56, 55, 40, 45, 50, 30, 20, 70, 75, 85, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10]

            }
        ]
    }

    const lineData = 
        {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [
              {
                label: 'Customers',
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
              display: true,
              text: 'Customers\nTHIS MONTH\n 54546', // Title text
              font: {
                size: 20 // Title font size
              }
            }
          },
          scales: {
            x: {
              display: false // Hide x-axis labels
            }
          }
    };

    return(
        <div className="p-10 grid gap-10 dashboard justify-center items-center grid-cols-3"  style={{ gridTemplateRows: '30% auto' }}>
            <div className="w-full border-[#E9E9EB] border-2 rounded-lg p-5 h-full">
                <div style={{width: '100%', height: '100%'}}>
                    <Bar data={data} options={options}/>
                </div>
            </div>
            <div>
                <div className="w-full border-[#E9E9EB] border-2 rounded-lg p-5 h-full">
                    <div style={{width: '100%', height: '100%'}}>
                        <Line data={lineData} options={lineOptions}/>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full border-[#E9E9EB] border-2 rounded-lg p-5 h-full">
                    <div style={{width: '100%', height: '100%'}}>
                        <Bar data={data} options={options}/>
                    </div>
                </div>
            </div>
            <div>4</div>
            <div className='col-span-2'>5</div>
        </div>
    )
}

export default Dashboard;