import mockJson from './mock.json';

const data = mockJson.filter(item => item.sim > 200).slice(0, 24);

data.sort((cur, next) => next.sim - cur.sim);

export let maxPv = data[0].pv;
export let maxSim = data[0].sim;

data.forEach(({pv, sim}) => {
  if (pv > maxPv) {
    maxPv = pv;
  }
  if (sim > maxSim) {
    maxSim = sim;
  }
});


export default data;