import OysterCard from "./OysterCard";
import { t } from "./constants";
import Transport from "./Transport";
import Stations from "./Stations";

const trip = new OysterCard(30);
const BUS = new Transport(t.BUS);
const TUBE = new Transport(t.TUBE);

console.log('==========TRIP-1==========')
trip.entryStation(Stations.HOLBORN, TUBE);
trip.exitStation(Stations.EARLS_COURT, TUBE);
trip.showValueWalletAndFares();
console.log('==========================')
console.log('==========TRIP-2==========')
trip.entryStation(Stations.EARLS_COURT, BUS);
trip.exitStation(Stations.WIMBLEDON, BUS);
trip.showValueWalletAndFares();
console.log('==========================')
console.log('==========TRIP-3==========')
trip.entryStation(Stations.EARLS_COURT, TUBE);
trip.exitStation(Stations.HAMMERSMITH, TUBE);
trip.showValueWalletAndFares();
console.log('==========================')
