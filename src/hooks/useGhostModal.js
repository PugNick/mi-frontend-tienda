import { useState } from "react";

export function useGhostModal() {
    const [ghostProduct, setGhostProduct] = useState(null);
    const [ghostVisible, setGhostVisible] = useState(false);

    const openGhost = (product) => {
        setGhostProduct(product);
        setTimeout(() => setGhostVisible(true), 10);
    };

    const closeGhost = () => {
        setGhostVisible(false);
        setTimeout(() => setGhostProduct(null), 400);
    };

    return { ghostProduct, ghostVisible, openGhost, closeGhost };
}
