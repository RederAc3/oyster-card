import OysterCard from "./OysterCard";
import { T } from "./constants";
import Transport from "./Transport";
import Stations from "./Stations";

const trip = new OysterCard(30);
const BUS = new Transport(T.BUS);
const TUBE = new Transport(T.TUBE);

trip.SwipeIn(Stations.HOLBORN, TUBE);
trip.SwipeOut(Stations.EARLS_COURT, TUBE);


trip.SwipeIn(Stations.EARLS_COURT, BUS);
trip.SwipeOut(Stations.HAMMERSMITH, BUS);

trip.SwipeIn(Stations.HAMMERSMITH, TUBE);
trip.SwipeOut(Stations.WIMBLEDON, TUBE);

trip.SwipeIn(Stations.HOLBORN, TUBE);
trip.SwipeOut(Stations.WIMBLEDON, TUBE);

console.log("Wallet: ", trip.Wallet);