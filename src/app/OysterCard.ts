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

    showValueWalletAndFares() {
        if (this.Wallet < this.Fare) {
            console.log("")
            throw new Error("Not enough funds!")
        } else {
            console.log(`Fare: £${this.Fare.toFixed(2)}`);
            console.log(`Wallet: £${this.Wallet.toFixed(2)}`);
        }
    }

    entryStation(station: Station, mode: Transport) {
        this.chargedFare = mode.type === t.BUS ? fares.ANY_BUS_TRIP : fares.MAX_FARE;
        
        if (this.Wallet < this.chargedFare) {
            throw new Error("Not enough funds!")
        } else {
            this.Wallet = this.Wallet - this.chargedFare;
            this.journey = [];
            this.journey[0] = {...station};
        }
    }

    exitStation(station: Station, mode: Transport) {
        if (this.Wallet < this.chargedFare) {
            throw new Error("Not enough funds!")

        } else if (this.isScammers()) {
            this.chargedFare = fares.MAX_FARE;
            this.Wallet -= this.chargedFare;

        } else {
            if (mode.type === t.BUS) {
                console.log(`${this.journey[0].name} to ${station.name}`);
                return;
            }

            this.journey[1] = {...station};
            this.tripOptimization();
            this.chargedFare = this.calculateTubeFare(this.setZonesTravelled(), this.journey);
            this.Wallet = (this.Wallet + fares.MAX_FARE) - this.chargedFare;
        }
    }

    isScammers():boolean {
        return (!this.journey[0]) ? true : false
    }

    selectZone(counts: number[], goal: number): number {
        const selectedZone = counts.reduce((prev, curr) => Math.abs(curr - goal) > Math.abs(prev - goal) ? curr : prev);
        return selectedZone;
    }

    tripOptimization() {
        const journey = this.journey;
        const inZone = journey[0].zone, outZone = journey[1].zone;
        const selectZone = this.selectZone;

        if (inZone.length < outZone.length) {
            journey[1].zone = [selectZone(outZone, inZone[0])];

        } else if (inZone.length > outZone.length) {
            journey[0].zone = [selectZone(inZone, outZone[0])];

        } else if (inZone.length > 1 && outZone.length > 1) {
            journey[0].zone = [selectZone(inZone, outZone[0])];
            journey[1].zone = [selectZone(outZone, inZone[0])];
        }
    }

    setZonesTravelled(): number {
        console.log(`${this.journey[0].name} to ${this.journey[1].name}`);
        return this.getZonesTravelledCount(this.journey[0].zone, this.journey[1].zone);
    }

    getZonesTravelledCount(from: number[], to: number[]): number {
        let count = 0;

        from.forEach(function (fromZone) {
            to.forEach(function (toZone) {
                count = Math.abs(fromZone - toZone) + 1;
            });
        });
        return count;
    }

    calculateTubeFare(zonesTravelled: number, journey: Station[]): number {
        const from = journey[0].zone, to = journey[1].zone;

        if (zonesTravelled == 1 && this.isAnywhereInZone1(from, to)) {
            return fares.ANYWHERE_IN_ZONE1;

        } else if (zonesTravelled === 1 && this.isOneZoneOutsideZone1(from, to)) {
            return fares.ONE_ZONE_OUTSIDE_ZONE1;

        } else if (zonesTravelled === 2 && this.isTwoZoneIncludingZone1(from, to)) {
            return fares.TWO_ZONE_INCLUDING_ZONE1;

        } else if (zonesTravelled === 2 && this.isTwoZoneExcludingZone1(from, to)) {
            return fares.TWO_ZONE_EXCLUDING_ZONE1;

        } else if (zonesTravelled === 3) {
            return fares.THREE_ZONES;
        }
        return fares.MAX_FARE;
    }

    isAnywhereInZone1(from: number[], to: number[]):boolean {
        return (from.includes(1) && to.includes(1)) ? true : false;
    }

    isOneZoneOutsideZone1(from: number[], to: number[]):boolean {
        return (!from.includes(1) && !to.includes(1)) ? true : false; 
    }

    isTwoZoneIncludingZone1(from: number[], to: number[]):boolean {
        return ((from.includes(1) && to.includes(2)) || from.includes(2) && to.includes(1)) ? true : false;
    }

    isTwoZoneExcludingZone1(from: number[], to: number[]):boolean {
        return (!from.includes(1) && !to.includes(1)) ? true : false;
    }
}
