import axios from 'axios';
import React from 'react';

import { ResponsivePie } from '@nivo/pie'

// class MyComponent extends React.Component {
//     state = {
//         data: []
//     }

//     componentDidMount() {
//         axios.get('http://localhost:8000/api/calendar-events/')
//             .then(response => {
//                 this.setState({ data: response.data });
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }

//     render() {
//         const { data } = this.state;
//         return (
//             <div>
//                 {data.map(item => (
//                     <div key={item.id}>
//                         <span>{item.title}</span>
//                         <span>{item.location}</span>
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// }

// export default MyComponent;


class MyComponent extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/calendar-events/')
      .then(response => {
        const dataByLocation = response.data.reduce((acc, current) => {
          const location = current.location;
          if (!acc[location]) {
            acc[location] = [];
          }
          acc[location].push(current);
          return acc;
        }, {});
        const data = Object.entries(dataByLocation).map(([location, events]) => ({
          id: location,
          value: events.length
        }));
        this.setState({ data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div style={{ height: 400 }}>
      <ResponsivePie data={data} />
    </div>
    );
  }
}

export default MyComponent;
