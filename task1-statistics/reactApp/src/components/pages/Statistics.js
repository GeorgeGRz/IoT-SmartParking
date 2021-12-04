import React from 'react';
import '../../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Statistics(){
  //const selected = useParams();
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/statistics`)
      .then(res => {
        if (loaded === false) {
          //Bar Graph
          var obj = res.data["message"];

          const data = {
            labels: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday'
            ],
            datasets: [
              {
                label: 'Peers per day',
                data: [
                  obj["Monday"],
                  obj["Tuesday"],
                  obj["Wendesday"],
                  obj["Thursday"],
                  obj["Friday"],
                  obj["Saturday"],
                  obj["Sunday"]
                ],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
              },
            ],
          };
          setLoaded(true);
          setData(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (loaded === false) {
    return loaded;
  } else {
    return (
      <div className='chart'>
        {data && (
          <Bar
            redraw
            data={data}
            width={350}
            height={350}
            options={{
              maintainAspectRatio: false,
            }}
          />
        )}
      </div>
    );
  }
};

export default Statistics;
