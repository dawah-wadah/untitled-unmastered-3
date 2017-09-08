import rp from 'request-promise-native';
import Promise from 'es6-promise';


const options = (endpoint) => {
  return {
    uri: `http://codetest.kube.getswift.com/${endpoint}`,
    header: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
};

const fetch = (item) => rp(options(item));

const getData = () => {
  return Promise.all([fetch('packages'), fetch('drones')])
  .then(res => {
    console.log(res);
  });
};

export default getData;
