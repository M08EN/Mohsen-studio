// Red flying bat silhouettes drifting up the background.
(function () {
    const canvas = document.getElementById('bat-canvas');
    const ctx = canvas.getContext('2d');
    const bats = [];

    // Bat silhouette drawn around (0,0), roughly 100 units wide.
    const body = new Path2D('M0 -14 L-4 -20 L-5 -11 C-8 -8 -8 4 -3 12 L0 16 L3 12 C8 4 8 -8 5 -11 L4 -20 Z');
    const wing = new Path2D('M4 -6 C16 -18 34 -20 50 -12 C44 -6 44 0 46 6 C38 2 32 4 28 10 C24 4 16 4 12 10 C10 4 6 2 4 2 Z');

    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Bat {
        constructor(scatter) { this.reset(scatter); }
        reset(scatter) {
            this.x = Math.random() * canvas.width;
            this.y = scatter ? Math.random() * canvas.height : canvas.height + 40;
            this.size = Math.random() * 0.25 + 0.15;
            this.speedY = Math.random() * 1.2 + 0.6;
            this.speedX = Math.random() * 2 - 1;
            this.wingAngle = Math.random() * Math.PI * 2;
            this.flapSpeed = Math.random() * 0.1 + 0.15;
            this.alpha = Math.random() * 0.4 + 0.45;
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX + Math.sin(this.wingAngle * 0.3) * 0.4;
            this.wingAngle += this.flapSpeed;
            if (this.y < -40 || this.x < -60 || this.x > canvas.width + 60) this.reset(false);
        }
        draw() {
            const flap = 0.25 + Math.abs(Math.sin(this.wingAngle)) * 0.75;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(this.size, this.size);
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = '#ff003c';
            ctx.shadowColor = 'rgba(255, 0, 60, 0.9)';
            ctx.shadowBlur = 12;
            ctx.fill(body);
            ctx.save(); ctx.scale(1, flap); ctx.fill(wing); ctx.restore();
            ctx.save(); ctx.scale(-1, flap); ctx.fill(wing); ctx.restore();
            ctx.restore();
        }
    }

    for (let i = 0; i < 26; i++) bats.push(new Bat(true));
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bats.forEach(b => { b.update(); b.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
})();
