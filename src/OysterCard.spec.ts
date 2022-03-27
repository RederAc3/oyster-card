import OysterCard from './OysterCard';
import Stations from './Stations';
import Transport from './Transport';
import { T } from './constants';

describe('OysterCard class', () => {

    const BUS = new Transport(T.BUS);
    const TUBE = new Transport(T.TUBE);

    it('should set initial balance to 30', () => {
        const trip = new OysterCard(30);
        expect(trip.Wallet).toEqual(30);
    });

    it('should deduct MAX FARE on SwipeIn', () => {
        const trip = new OysterCard(30);

        trip.SwipeIn(Stations.HOLBORN, TUBE);
        expect(trip.Wallet).toEqual(26.8);
    });

    it('should deduct BUS FARE on SwipeIn/Out', () => {
        const trip = new OysterCard(30);

        trip.SwipeIn(Stations.EARLS_COURT, BUS);
        trip.SwipeOut(Stations.HAMMERSMITH, BUS);
        expect(trip.Wallet).toEqual(28.2);
    });

    it('should call ZONES Travelled on SwipeOut', () => {
        const trip = new OysterCard(30);
        spyOn(trip, 'getZonesTravelledCount');

        trip.SwipeIn(Stations.HAMMERSMITH, TUBE);
        trip.SwipeOut(Stations.HOLBORN, TUBE);
        expect(trip.getZonesTravelledCount).toHaveBeenCalled();
        expect(trip.getZonesTravelledCount).toHaveBeenCalledWith(Stations.HAMMERSMITH.zone, Stations.HOLBORN.zone);

        trip.SwipeIn(Stations.HOLBORN, TUBE);
        trip.SwipeOut(Stations.WIMBLEDON, TUBE);
        expect(trip.getZonesTravelledCount).toHaveBeenCalledWith(Stations.HOLBORN.zone, Stations.WIMBLEDON.zone);
    });

    it('should calculate Zones Traveled count', () => {
        const trip = new OysterCard(30);
        let count = trip.getZonesTravelledCount(Stations.HAMMERSMITH.zone, Stations.HOLBORN.zone);
        expect(count).toEqual(2);

        count = trip.getZonesTravelledCount(Stations.HOLBORN.zone, Stations.WIMBLEDON.zone);
        expect(count).toEqual(3);
    });

    it('Anywhere in Zone 1', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(Stations.WIMBLEDON, TUBE);
        trip.SwipeOut(Stations.EARLS_COURT, TUBE);

        expect(trip.Wallet).toEqual(27.5);
    });

    it('Any one zone outside zone 1', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(Stations.EARLS_COURT, TUBE);
        trip.SwipeOut(Stations.WIMBLEDON, TUBE);

        expect(trip.Wallet).toEqual(28);
    });

    it('Two zones including zone 1', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(Stations.HOLBORN, TUBE);
        trip.SwipeOut(Stations.EARLS_COURT, TUBE);

        expect(trip.Wallet).toEqual(27);
    });

    it('Two zones excluding zone 1', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(Stations.WIMBLEDON, TUBE);
        trip.SwipeOut(Stations.HAMMERSMITH, TUBE);

        expect(trip.Wallet).toEqual(27.75);
    });

    it('Any three zones', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(Stations.HOLBORN, TUBE);
        trip.SwipeOut(Stations.WIMBLEDON, TUBE);

        expect(trip.Wallet).toEqual(26.8);
    });

    it('Any BUS journey', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(Stations.HOLBORN, BUS);
        trip.SwipeOut(Stations.WIMBLEDON, BUS);

        expect(trip.Wallet).toEqual(28.2);
    });
});
