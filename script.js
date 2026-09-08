/* =====================================================
   FLOATING ANIMATED CRYPTO CANDLESTICKS
   ===================================================== */

(function () {

  function createCandleBackground() {

    if (document.getElementById("candleBackground")) return;

    const canvas = document.createElement("canvas");
    canvas.id = "candleBackground";

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let candles = [];
    let width = 0;
    let height = 0;

    function resize() {

      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      createCandles();
    }

    function createCandles() {

      candles = [];

      const spacing = window.innerWidth < 600 ? 48 : 65;
      const count = Math.ceil(width / spacing) + 5;

      for (let i = 0; i < count; i++) {

        candles.push({
          x: i * spacing + Math.random() * 30,
          y: Math.random() * height,
          bodyHeight: 25 + Math.random() * 90,
          width: window.innerWidth < 600 ? 8 : 12,
          speed: 0.15 + Math.random() * 0.35,
          drift: (Math.random() - 0.5) * 0.25,
          phase: Math.random() * Math.PI * 2,
          green: Math.random() > 0.48,
          opacity: 0.25 + Math.random() * 0.5
        });

      }

    }

    function drawCandle(candle, time) {

      candle.y -= candle.speed;

      candle.x += Math.sin(
        time * 0.0005 + candle.phase
      ) * candle.drift;

      if (candle.y < -150) {

        candle.y = height + 100;

        candle.green = Math.random() > 0.48;

        candle.bodyHeight =
          25 + Math.random() * 90;

      }

      const wickTop =
        candle.y - candle.bodyHeight * 0.65;

      const wickBottom =
        candle.y + candle.bodyHeight * 0.65;

      const color =
        candle.green
          ? `rgba(0,255,130,${candle.opacity})`
          : `rgba(255,45,55,${candle.opacity})`;

      const glow =
        candle.green
          ? "rgba(0,255,130,0.35)"
          : "rgba(255,45,55,0.35)";


      /* Glow */

      ctx.shadowBlur = 18;
      ctx.shadowColor = glow;


      /* Wick */

      ctx.beginPath();

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      ctx.moveTo(
        candle.x,
        wickTop
      );

      ctx.lineTo(
        candle.x,
        wickBottom
      );

      ctx.stroke();


      /* Candle body */

      ctx.fillStyle = color;

      ctx.fillRect(
        candle.x - candle.width / 2,
        candle.y - candle.bodyHeight / 2,
        candle.width,
        candle.bodyHeight
      );


      /* Highlight */

      ctx.shadowBlur = 0;

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      ctx.strokeRect(
        candle.x - candle.width / 2,
        candle.y - candle.bodyHeight / 2,
        candle.width,
        candle.bodyHeight
      );

    }


    function animate(time) {

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      candles.forEach(function (candle) {

        drawCandle(candle, time);

      });

      requestAnimationFrame(animate);

    }


    resize();

    window.addEventListener(
      "resize",
      resize
    );

    requestAnimationFrame(animate);

  }


  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      createCandleBackground
    );

  } else {

    createCandleBackground();

  }

})();
