/* =====================================================
   PROFESSIONAL LIVE-STYLE TRADING CHART BACKGROUND
   ===================================================== */

(function () {

  function startTradingChart() {

    if (document.getElementById("candleBackground")) return;

    const canvas = document.createElement("canvas");
    canvas.id = "candleBackground";

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let candles = [];

    const isMobile = () => window.innerWidth < 600;

    function resize() {

      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createChart();
    }


    /* ================================
       CREATE CONTINUOUS MARKET PATTERN
       ================================ */

    function createChart() {

      candles = [];

      const spacing = isMobile() ? 18 : 25;
      const count = Math.ceil(width / spacing) + 20;

      let price = 100;

      for (let i = 0; i < count; i++) {

        /*
          Smooth trend + market noise.
          This gives the chart a continuous
          trading pattern instead of random
          floating candles.
        */

        const wave =
          Math.sin(i * 0.12) * 1.8 +
          Math.sin(i * 0.035) * 3;

        const movement =
          (Math.random() - 0.48) * 3;

        const open = price;

        const close =
          open + wave + movement;

        const high =
          Math.max(open, close) +
          1 +
          Math.random() * 3;

        const low =
          Math.min(open, close) -
          1 -
          Math.random() * 3;

        candles.push({

          x: i * spacing,

          open: open,
          close: close,
          high: high,
          low: low,

          width:
            isMobile()
              ? 7
              : 11

        });

        price = close;
      }
    }


    /* ================================
       CALCULATE CHART SCALE
       ================================ */

    function getScale() {

      let highest = -Infinity;
      let lowest = Infinity;

      candles.forEach(c => {

        highest =
          Math.max(highest, c.high);

        lowest =
          Math.min(lowest, c.low);

      });

      return {

        highest,
        lowest,

        range:
          Math.max(
            highest - lowest,
            1
          )

      };
    }


    /* ================================
       DRAW TRADING GRID
       ================================ */

    function drawGrid() {

      ctx.save();

      ctx.strokeStyle =
        "rgba(255,255,255,0.035)";

      ctx.lineWidth = 1;

      const grid =
        isMobile()
          ? 32
          : 45;


      for (
        let x = 0;
        x <= width;
        x += grid
      ) {

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(
          x,
          height
        );

        ctx.stroke();
      }


      for (
        let y = 0;
        y <= height;
        y += grid
      ) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(
          width,
          y
        );

        ctx.stroke();
      }

      ctx.restore();
    }


    /* ================================
       DRAW ONE PROFESSIONAL CANDLE
       ================================ */

    function drawCandle(
      candle,
      scale
    ) {

      const topSpace =
        height * 0.12;

      const chartHeight =
        height * 0.76;


      function priceToY(price) {

        return (
          topSpace +
          (
            (scale.highest - price) /
            scale.range
          ) *
          chartHeight
        );

      }


      const openY =
        priceToY(candle.open);

      const closeY =
        priceToY(candle.close);

      const highY =
        priceToY(candle.high);

      const lowY =
        priceToY(candle.low);


      const bullish =
        candle.close >= candle.open;


      const bodyTop =
        Math.min(
          openY,
          closeY
        );

      const bodyBottom =
        Math.max(
          openY,
          closeY
        );


      const bodyHeight =
        Math.max(
          bodyBottom - bodyTop,
          4
        );


      /*
        Red / Green professional
        trading colours.
      */

      const bodyColor =
        bullish
          ? "rgba(0,255,125,0.62)"
          : "rgba(255,45,55,0.62)";


      const glowColor =
        bullish
          ? "rgba(0,255,125,0.35)"
          : "rgba(255,45,55,0.35)";


      /* Candle glow */

      ctx.save();

      ctx.shadowBlur = 10;
      ctx.shadowColor =
        glowColor;


      /* Wick */

      ctx.beginPath();

      ctx.strokeStyle =
        bodyColor;

      ctx.lineWidth = 1.4;

      ctx.moveTo(
        candle.x,
        highY
      );

      ctx.lineTo(
        candle.x,
        lowY
      );

      ctx.stroke();


      /* Candle body */

      ctx.fillStyle =
        bodyColor;

      ctx.fillRect(

        candle.x -
        candle.width / 2,

        bodyTop,

        candle.width,

        bodyHeight
      );


      /* Body outline */

      ctx.shadowBlur = 0;

      ctx.strokeStyle =
        bodyColor;

      ctx.lineWidth = 1;

      ctx.strokeRect(

        candle.x -
        candle.width / 2,

        bodyTop,

        candle.width,

        bodyHeight
      );

      ctx.restore();
    }


    /* ================================
       ANIMATION
       ================================ */

    let lastTime = 0;

    function animate(time) {

      if (!lastTime) {

        lastTime =
          time;

      }

      const delta =
        Math.min(
          time - lastTime,
          40
        );

      lastTime =
        time;


      ctx.clearRect(
        0,
        0,
        width,
        height
      );


      drawGrid();


      /*
        Slowly move the chart
        from right → left.
      */

      const movement =
        delta * 0.018;


      candles.forEach(
        candle => {

          candle.x -=
            movement;

        }
      );


      /*
        Add a new candle
        on the right.
      */

      const spacing =
        isMobile()
          ? 18
          : 25;

      const last =
        candles[candles.length - 1];


      if (
        last &&
        last.x <
        width -
        spacing * 2
      ) {

        const previous =
          last.close;


        const trend =
          Math.sin(
            Date.now() *
            0.00012
          ) * 1.4;


        const open =
          previous;


        const close =
          open +
          trend +
          (Math.random() - 0.48) * 2.2;


        const high =
          Math.max(
            open,
            close
          ) +
          1 +
          Math.random() * 2.5;


        const low =
          Math.min(
            open,
            close
          ) -
          1 -
          Math.random() * 2.5;


        candles.push({

          x:
            width + spacing,

          open,
          close,
          high,
          low,

          width:
            isMobile()
              ? 7
              : 11

        });
      }


      /*
        Remove candles that
        leave the screen.
      */

      while (
        candles.length &&
        candles[0].x <
        -60
      ) {

        candles.shift();

      }


      const scale =
        getScale();


      /*
        Draw candles.
      */

      candles.forEach(
        candle => {

          drawCandle(
            candle,
            scale
          );

        }
      );


      requestAnimationFrame(
        animate
      );
    }


    resize();


    window.addEventListener(
      "resize",
      resize
    );


    requestAnimationFrame(
      animate
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      startTradingChart
    );

  } else {

    startTradingChart();

  }

})();
