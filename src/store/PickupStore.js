import { makeAutoObservable } from "mobx";

class PickupStore {
    selectedPickup = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedPickup(pickup) {
        this.selectedPickup = pickup;
    }
}

const pickupStore = new PickupStore();
export default pickupStore;
