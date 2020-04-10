import BulletSprite from "./BulletSprite";

class ShipSprite extends Phaser.Physics.Arcade.Sprite {
    gameWidth: number;
    gameHeight: number;
    boundLeft: number;
    boundRight: number;
    boundTop: number;
    boundBottom: number;
    WKey: Phaser.Input.Keyboard.Key;
    AKey: Phaser.Input.Keyboard.Key;
    DKey: Phaser.Input.Keyboard.Key;
    SPACEKey: Phaser.Input.Keyboard.Key;
    body: Phaser.Physics.Arcade.Body;
    bullets: BulletSprite[];
    lastFited: number;
    timeBetweenShots: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'ship');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setDrag(300, 300);
        this.body.setAngularDrag(400);
        this.body.setMaxVelocity(600);
        this.body.setAcceleration(0, 0);
        this.body.setAngularVelocity(0);

        this.setAngle(-90);
        this.setScale(0.5);

        this.bullets = [];
        this.lastFited = 0;
        this.timeBetweenShots = 400;

        this.initInputs();
        this.setGameBounds();
    }

    initInputs() {
        this.scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.WKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.AKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SPACEKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    setGameBounds() {
        this.gameWidth = Number(this.scene.sys.game.config.width);
        this.gameHeight = Number(this.scene.sys.game.config.height);

        this.boundLeft = 0;
        this.boundTop = 0;
        this.boundRight = this.gameWidth;
        this.boundBottom = this.gameHeight;
    }

    update(time: number, delta: number) {
        this.bullets.map(bullet => {
            bullet.update(time, delta);
        });

        this.setInputsControl(time);
        this.teleportControl();
    }

    setInputsControl(time: number) {
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

        if (this.SPACEKey.isDown && time > this.lastFited) {
            const bullet = new BulletSprite(this.scene);

            bullet.fire(this.x, this.y, this.body.rotation);
            this.bullets.push(bullet);

            this.lastFited = time + this.timeBetweenShots;
        }
    }

    teleportControl() {
        if (this.x < this.boundLeft) {
            this.x = this.gameWidth;
        } else if (this.x > this.boundRight) {
            this.x = 0;
        }

        if (this.y < this.boundTop) {
            this.y = this.gameHeight;
        } else if (this.y > this.boundBottom) {
            this.y = 0;
        }
    }
}

export default ShipSprite;