var Model = {
  // QuadTree: function(level, bounds) {
  //   this.level = level;
  //   this.bounds = bounds;
  //   this.MAX_OBJECTS = 10;
  //   this.MAX_LEVELS = 5;
  //   this.objects = [];
  //   this.nodes = [];
  //   this.clear = function() {
  //     this.objects.clear();
  //     for(var i = 0; i < this.nodes.length; i++) {
  //       if(this.nodes[i] != null) {
  //         this.nodes[i].clear();
  //         this.nodes[i] = null;
  //       }
  //     }
  //   };
  //   this.split = function() {
  //     var subWidth = this.bounds.width / 2;
  //     var subHeight = this.bounds.height / 2;
  //     var x = this.bounds.x;
  //     var y = this.bounds.y;
  //     this.nodes.push(new Model.QuadTree(this.level + 1,
  //       {x: x + subWidth, y: y, width: subWidth, heigh: subHeight}));
  //     this.nodes.push(new Model.QuadTree(this.level + 1,
  //       {x: x, y: y, width: subWidth, heigh: subHeight}));
  //     this.nodes.push(new Model.QuadTree(this.level + 1,
  //       {x: x, y: y + subHeight, width: subWidth, heigh: subHeight}));
  //     this.nodes.push(new Model.QuadTree(this.level + 1,
  //       {x: x + subWidth, y: y + subHeight, width: subWidth, heigh: subHeight}));
  //   };
  //   this.getIndex = function(particle) {
  //     var index = -1;
  //     var vMidpoint = this.bounds.x + this.bounds.width / 2;
  //     var hMidpoint = this.bounds.y + this.bounds.height / 2;
  //     if(particle.x < vMidpoint && particle.y < hMidpoint) {
  //       index = 1;
  //     }
  //     else if(particle.x < vMidpoint && particle.y > hMidpoint) {
  //       index = 2;
  //     }
  //     else if(particle.x > vMidpoint && particle.y < hMidpoint) {
  //       index = 0;
  //     }
  //     else if(particle.x > vMidpoint && particle.y > hMidpoint) {
  //       index = 3;
  //     }
  //     return index;
  //   };
  //
  // }
  width: null,
  height: null,
  particles: [],
  edges: [],
  particle: function(cWidth, cHeight) {
    this.x = Math.random() * cWidth;
    this.y = Math.random() * cHeight;
    this.vX = Math.random() * cWidth / 50 - cWidth / 100;
    this.vY = Math.random() * cHeight / 50 - cHeight / 100;
    this.edges = new Array(Model.particles.length);
    this.update = function(delta, index) {
      this.x += delta * this.vX;
      this.y += delta * this.vY;
      if(this.x < 0 || this.x > Model.width) {
        if(this.x < 0)
          this.x = 0;
        else
          this.x = Model.width;
        this.vX *= -1;
      }
      if(this.y < 0 || this.y > Model.height) {
        if(this.y < 0)
          this.y = 0;
        else
          this.y = Model.height;
        this.vY *= -1;
      }
      for(var i = 0; i < Model.particles.length; i++) {
        var p = Model.particles[i];
        if(this.x - p.x < 100 && this.x - p.x > -100
          && this.y - p.y < 100 && this.y - p.y > -100) {
          if(this.edges[i] == null && i != index) {
            this.edges[i] = 1;
            p.edges[index] = 1;
            var edge = {
              x0: this.x,
              x1: p.x,
              y0: this.y,
              y1: p.y
            }
            Model.edges.push(edge);
          }
        }
        else {
          this.edges[i] = null;
          p.edges[index] = null;
        }
      }
      if(this.x - Controller.mousePos.x < 100 && this.x - Controller.mousePos.x > -100
        && this.y - Controller.mousePos.y < 100 && this.y - Controller.mousePos.y > -100) {
        var edge = {
          x0: this.x,
          x1: Controller.mousePos.x,
          y0: this.y,
          y1: Controller.mousePos.y
        }
        Model.edges.push(edge);
      }
    }
  },
  init: function(cWidth, cHeight) {
    this.width = cWidth;
    this.height = cHeight;
    for(var i = 0; i < 50; i++) {
      var particle = new Model.particle(cWidth, cHeight);
      this.particles[i] = particle;
    }
  },
  resize: function(cWidth, cHeight) {
    for(var i = 0; i < this.particles.length; i++) {
      this.particles[i].x *= cWidth / this.width;
      this.particles[i].vX *= cWidth / this.width;
      this.particles[i].y *= cHeight / this.height;
      this.particles[i].vY *= cHeight / this.height;
    }
    this.width = cWidth;
    this.height = cHeight;
  },
  updateParticles: function(delta) {
    this.edges = [];
    for(var i = 0; i < this.particles.length; i++) {
      for(var j = 0; j < this.particles[i].edges.length; j++) {
        this.particles[i].edges[j] = null;
      }
    }
    for(var i = 0; i < this.particles.length; i++) {
      this.particles[i].update(delta, i);
    }
  }
};

var Controller = {
  fps: 60,
  then: Date.now(),
  loopInterval: null,
  mousePos: {
    x: 0,
    y: 0
  },
  init: function() {
    View.init();
    Model.init(View.width, View.height);
    Controller.initLoop();
  },
  update: function(delta) {
    Model.updateParticles(delta);
  },
  initLoop: function() {
    this.loopInterval = setInterval(function() {
      Controller.loop()
    }, 1000 / Controller.fps);
  },
  loop: function() {
    var now = Date.now();
    var delta = (now - Controller.then) / 1000;
    View.clear();
    Controller.update(delta);
    View.render(Model.particles, Model.edges);
    Controller.then = now;
  },
  addCanvasEventListener: function() {
    window.addEventListener('mousemove', function(e) {
      Controller.mousePos = Controller.getMousePos(View.canvas, e);
    }, false);
    window.addEventListener('resize', function() {
      Model.resize(View.canvas.width, View.canvas.height);
      View.resize();
    });
  },
  getMousePos: function(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
};

var View = {
  width: window.innerWidth,
  height: window.innerHeight,
  canvas: null,
  ctx: null,
  init: function() {
    View.canvas = document.getElementById("background");
    View.ctx = View.canvas.getContext("2d");
    View.canvas.width = this.width;
    View.canvas.height = this.height;
    Controller.addCanvasEventListener();
  },
  clear: function() {
    View.ctx.clearRect(0, 0, this.width, this.height);
    // View.ctx.fillStyle = "#2c3e50";
    // View.ctx.fillRect(0, 0, this.width, this.height);
  },
  render: function(particles, edges) {
    View.ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
    View.ctx.beginPath();
    for(var i = 0; i < edges.length; i++) {
      View.ctx.moveTo(edges[i].x0, edges[i].y0);
      View.ctx.lineTo(edges[i].x1, edges[i].y1);
      View.ctx.stroke();
    }
    View.ctx.closePath();
    View.ctx.fillStyle = "#ffffff";

    for(var i = 0; i < particles.length; i++) {
      // console.log(particles[i].y);
      View.ctx.beginPath();
      View.ctx.arc(particles[i].x, particles[i].y, 1.5, 0, 2 * Math.PI, false);
      View.ctx.fill();
      View.ctx.closePath();
      //View.ctx.fillRect(particles[i].x - 1.5, particles[i].y - 1.5, 3, 3);
    }
  },
  resize: function() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    View.canvas.width = this.width;
    View.canvas.height = this.height;
  }
}

Controller.init();
