import ShipSprite from "../objects/ShipSprite";

class MainScene extends Phaser.Scene {
    ship: ShipSprite;
    background: Phaser.GameObjects.TileSprite;

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image('ship', 'assets/img/ship.png');
        this.load.image('background', 'assets/img/blue.png');
        this.load.image('bullet', 'assets/img/laser.png');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'background');
        this.background.setOrigin(0, 0);

        this.ship = new ShipSprite(this, this.cameras.main.width / 2, this.cameras.main.height / 2);
    }

    update(time, delta) {
        this.ship.update(time, delta);
    }
}

export default MainScene;