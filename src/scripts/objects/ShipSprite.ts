class ShipSprite extends Phaser.Physics.Arcade.Sprite {
    WKey: Phaser.Input.Keyboard.Key;
    AKey: Phaser.Input.Keyboard.Key;
    DKey: Phaser.Input.Keyboard.Key;
    body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'ship');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setDrag(300, 300);
        this.body.setAngularDrag(400);
        this.body.setMaxVelocity(600);
        this.body.setAcceleration(0, 0);
        this.body.setAngularVelocity(0);

        this.WKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.AKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        if (this.WKey.isDown) {
            this.scene.physics.velocityFromRotation(this.rotation, 600, this.body.acceleration);
        } else {
            this.body.setAcceleration(0, 0);
        }

        if (this.AKey.isDown) {
            this.body.setAngularVelocity(-150);
        }
        else if (this.DKey.isDown) {
            this.body.setAngularVelocity(150);
        }
        else {
            this.body.setAngularVelocity(0);
        }
    }
}

export default ShipSprite;