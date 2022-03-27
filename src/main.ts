import OysterCard from "./OysterCard";
import { T } from "./constants";
import Transport from "./Transport";
import Stations from "./Stations";

const trip = new OysterCard(30);
const BUS = new Transport(T.BUS);
const TUBE = new Transport(T.TUBE);

console.log('==========TRIP-1==========')

trip.SwipeIn(Stations.HOLBORN, TUBE);
trip.SwipeOut(Stations.EARLS_COURT, TUBE);
console.log(`Fare: ${trip.Fare.toFixed(2)}`)
console.log(`Wallet: ${trip.Wallet.toFixed(2)}`);

console.log('==========================')

console.log('==========TRIP-2==========')

trip.SwipeIn(Stations.EARLS_COURT, BUS);
trip.SwipeOut(Stations.HAMMERSMITH, BUS);
console.log(`Fare: ${trip.Fare.toFixed(2)}`)
console.log(`Wallet: ${trip.Wallet.toFixed(2)}`);
console.log('==========================')

console.log('==========TRIP-3==========')

trip.SwipeIn(Stations.EARLS_COURT, TUBE);
trip.SwipeOut(Stations.HAMMERSMITH, TUBE);
console.log(`Fare: ${trip.Fare.toFixed(2)}`)
console.log(`Wallet: ${trip.Wallet.toFixed(2)}`);
console.log('==========================')

console.log('==========TRIP-4==========')

trip.SwipeIn(Stations.HOLBORN, TUBE);
trip.SwipeOut(Stations.WIMBLEDON, TUBE);
console.log(`Fare: ${trip.Fare.toFixed(2)}`)
console.log(`Wallet: ${trip.Wallet.toFixed(2)}`);

console.log('==========================')