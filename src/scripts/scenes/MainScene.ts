import ShipSprite from "../objects/ShipSprite";

class MainScene extends Phaser.Scene {
    ship: ShipSprite;

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image(
            'ship',
            'assets/img/ship.png',
        );
    }

    create() {
        this.ship = new ShipSprite(this, this.cameras.main.width / 2, this.cameras.main.height / 2);
    }

    update() {
        this.ship.update();
    }
}

export default MainScene;