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

      /* More candles across the screen */
      const spacing = window.innerWidth < 600 ? 28 : 38;
      const columns = Math.ceil(width / spacing) + 8;

      /* Several rows of candles */
      const rows = window.innerWidth < 600 ? 7 : 9;

      for (let row = 0; row < rows; row++) {

        for (let i = 0; i < columns; i++) {

          const green = Math.random() > 0.48;

          candles.push({

            x: i * spacing +
              Math.random() * spacing,

            y: Math.random() * height,

            bodyHeight:
              18 + Math.random() * 75,

            width:
              window.innerWidth < 600
                ? 6 + Math.random() * 4
                : 8 + Math.random() * 7,

            speed:
              0.08 + Math.random() * 0.22,

            drift:
              (Math.random() - 0.5) * 0.18,

            phase:
              Math.random() * Math.PI * 2,

            green: green,

            opacity:
              0.40 + Math.random() * 0.40

          });

        }

      }

    }

    function drawCandle(candle, time) {

      candle.y -= candle.speed;

      candle.x +=
        Math.sin(
          time * 0.00035 +
          candle.phase
        ) * candle.drift;

      if (candle.y < -130) {

        candle.y =
          height + 100;

        candle.green =
          Math.random() > 0.48;

        candle.bodyHeight =
          18 + Math.random() * 75;

      }

      const wickLength =
        candle.bodyHeight * 0.75;

      const wickTop =
        candle.y - wickLength;

      const wickBottom =
        candle.y + wickLength;

      const color =
        candle.green
          ? `rgba(0,255,110,${candle.opacity})`
          : `rgba(255,35,45,${candle.opacity})`;

      const glow =
        candle.green
          ? "rgba(0,255,110,0.55)"
          : "rgba(255,35,45,0.55)";

      /* Glow */
      ctx.shadowBlur = 12;
      ctx.shadowColor = glow;

      /* Wick */
      ctx.beginPath();

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;

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

      /* Bright edge */
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
