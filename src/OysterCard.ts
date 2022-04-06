import { Station, t, fares } from "./constants";
import Transport from "./Transport"

export default class {
    private _wallet: number;
    private chargedFare: number;
    private journey: Station[];

    constructor(amount = 0) {
        this._wallet = amount;
        this.chargedFare = 0;
        this.journey = [];
    }

    set Wallet(amt: number) {
        this._wallet = amt;
    }

    get Wallet(): number {
        return this._wallet;
    }

    get Fare(): number {
        return this.chargedFare;
    }

    SwipeIn(station: Station, mode: Transport) {
        this.chargedFare = mode.type === t.BUS ? fares.ANY_BUS_TRIP : fares.MAX_FARE;

        if (this.Wallet < this.chargedFare) {
            return "Wallet doesn't meet minimum balance";
        }

        this.Wallet = this.Wallet - this.chargedFare;
        this.journey = []
        this.journey[0] = JSON.parse(JSON.stringify(station));

    }

    SwipeOut(station: Station, mode: Transport) {
        if (mode.type === t.BUS) {
            console.log(`${this.journey[0].name} to ${station.name} via BUS`);
            return;
        }

        this.journey[1] = JSON.parse(JSON.stringify(station));
        this.tripOptimization();
        this.chargedFare = this.calculateTubeFare(this.setZonesTravelled(), this.journey);
        this.Wallet = (this.Wallet + fares.MAX_FARE) - this.chargedFare;
    }

    selectZone(counts: number[], goal: number) {
        const selectedZone = counts.reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
        return selectedZone
    }

    tripOptimization() {
        const inZone = this.journey[0].zone, outZone = this.journey[1].zone;
        if (inZone.length < outZone.length) {
            this.journey[1].zone = [this.selectZone(outZone, inZone[0])]
            return;

        } else if (inZone.length > outZone.length) {
            this.journey[0].zone = [this.selectZone(inZone, outZone[0])];
            return;
        }
    }

    setZonesTravelled(): number {
        console.log(`${this.journey[0].name} to ${this.journey[1].name}`);
        return this.getZonesTravelledCount(this.journey[0].zone, this.journey[1].zone);
    }

    getZonesTravelledCount(from: number[], to: number[]): number {
        let count;
        from.forEach(function (fromZone) {
            to.forEach(function (toZone) {
                count = Math.abs(fromZone - toZone) + 1;
            });
        });
        return count;
    }

    calculateTubeFare(zonesTravelled: number, journey: Station[]): number {
        const from = journey[0].zone, to = journey[1].zone;
        if (zonesTravelled == 1 && from.includes(1) && to.includes(1)) {
            return fares.ANYWHERE_IN_ZONE1;
        }
        if (zonesTravelled === 1 && !from.includes(1) && !to.includes(1)) {
            return fares.ONE_ZONE_OUTSIDE_ZONE1;
        }
        if (zonesTravelled === 2 && (from.includes(1) && to.includes(2)) || from.includes(2) && to.includes(1)) {
            return fares.TWO_ZONE_INCLUDING_ZONE1;
        }
        if (zonesTravelled === 2 && !from.includes(1) && !to.includes(1)) {
            return fares.TWO_ZONE_EXCLUDING_ZONE1;
        }
        if (zonesTravelled === 3) {
            return fares.THREE_ZONES;
        }
        return fares.MAX_FARE;
    }
}
