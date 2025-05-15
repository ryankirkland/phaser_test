const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: { preload, create, update }
  };
  
  let player, cursors;
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('tiles', 'assets/tilesets/town.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/map.json');
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }
  
  function create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('1', 'tiles');

  
    map.createLayer('Tile Layer 1', tileset, 0, 0);
    const collisionLayer = map.createLayer('Collision', tileset, 0, 0);
    collisionLayer.setCollisionByProperty({ collides: true });

    // collisionLayer.renderDebug(this.add.graphics(), {
    //     tileColor: null,
    //     collidingTileColor: new Phaser.Display.Color(255, 0, 0, 100),
    //     faceColor: new Phaser.Display.Color(0, 255, 0, 255)
    //   });
      
  
    player = this.physics.add.sprite(100, 100, 'player', 0);
    this.physics.add.collider(player, collisionLayer);
  
    this.cameras.main.startFollow(player);
    cursors = this.input.keyboard.createCursorKeys();
  
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
  }
  
  function update() {
    const speed = 150;
    player.body.setVelocity(0);
  
    if (cursors.left.isDown) player.body.setVelocityX(-speed);
    else if (cursors.right.isDown) player.body.setVelocityX(speed);
  
    if (cursors.up.isDown) player.body.setVelocityY(-speed);
    else if (cursors.down.isDown) player.body.setVelocityY(speed);
  
    if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown) {
      player.anims.play('walk', true);
    } else {
      player.anims.stop();
    }
  }
  