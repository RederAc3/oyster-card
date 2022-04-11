import OysterCard from '../app/OysterCard';
import Stations from '../app/Stations';
import Transport from '../app/Transport';
import { t } from '../app/constants';

describe('OysterCard class', () => {

    const BUS = new Transport(t.BUS);
    const TUBE = new Transport(t.TUBE);

    it('should set initial balance to 30', () => {
        const trip = new OysterCard(30);
        expect(trip.Wallet).toEqual(30);
    });

    it('should deduct MAX FARE on entry station', () => {
        const trip = new OysterCard(30);
        trip.entryStation(Stations.HOLBORN, TUBE);
        expect(trip.Wallet).toEqual(26.8);
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
        trip.entryStation(Stations.HOLBORN, TUBE);
        trip.exitStation(Stations.EARLS_COURT, TUBE);
        expect(trip.Wallet).toEqual(27);
    });

    // it('Any one zone outside zone 1', () => {
    //     const trip = new OysterCard(30);
    //     trip.entryStation(Stations.EARLS_COURT, TUBE);
    //     trip.exitStation(Stations.HAMMERSMITH, TUBE);
    //     expect(trip.Wallet).toEqual(28);
    // });

    it('Any two zones including zone 1', () => {
        const trip = new OysterCard(30);
        trip.entryStation(Stations.HOLBORN, TUBE);
        trip.exitStation(Stations.HAMMERSMITH, TUBE);
        expect(trip.Wallet).toEqual(27);
    });


    it('Any two zones excluding zone 1', () => {
        const trip = new OysterCard(30);
        trip.entryStation(Stations.WIMBLEDON, TUBE);
        trip.exitStation(Stations.HAMMERSMITH, TUBE);
        expect(trip.Wallet).toEqual(27.75);
    });

    it('Any three zones', () => {
        const trip = new OysterCard(30);
        trip.entryStation(Stations.HOLBORN, TUBE);
        trip.exitStation(Stations.WIMBLEDON, TUBE);
        expect(trip.Wallet).toEqual(26.8);
    });

    it('Any BUS journey', () => {
        const trip = new OysterCard(30);
        trip.entryStation(Stations.HOLBORN, BUS);
        trip.exitStation(Stations.WIMBLEDON, BUS);
        expect(trip.Wallet).toEqual(28.2);
    });

    it('is scammers', () => {
        const trip = new OysterCard(30);
        trip.exitStation(Stations.WIMBLEDON, TUBE)
        expect(trip.Wallet).toEqual(26.8);
        // expect(trip.isScammers())
    })

    it('low balance', () => {
        const trip = new OysterCard(0);
        expect(() => {
            trip.entryStation(Stations.HOLBORN, TUBE)
        }).toThrow('Not enough funds!')
    });

    it('ANDRZEJ to EARLS_COURT', () => {
        const trip = new OysterCard(30);
        trip.entryStation(Stations.ANDRZEJ, TUBE)
        trip.exitStation(Stations.EARLS_COURT, TUBE)
        expect(trip.Wallet).toEqual(26.8)
    });
});
