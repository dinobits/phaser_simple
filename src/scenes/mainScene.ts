export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
        console.log('Constructing MainScene');
    }
    init(params: any): void { }
    preload(): void {
        console.log('Preload MainScene');
    }

    create(): void {
        console.log('Create MainScene');
        this.add.image(400, 300, 'sky');

        const particles = this.add.particles('red');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
    }
    update(time: any): void { }
};