import RegionSelection from "./RegionSelection";

new RegionSelection({
    onFinish(rect) {
        console.log('rect', rect);
    }
});
