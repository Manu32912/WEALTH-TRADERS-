/* =====================================================
   WEALTH TRADERS
   PROFESSIONAL 3-LINE TRADING CHART BACKGROUND
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

    const lines = [];

    const isMobile = () =>
      window.innerWidth < 600;


    /* =================================================
       RESIZE
       ================================================= */

    function resize() {

      width = window.innerWidth;
      height = window.innerHeight;

      const dpr =
        Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      createLines();
    }


    /* =================================================
       CREATE THREE TRADING LINES
       ================================================= */

    function createLines() {

      lines.length = 0;

      const spacing =
        isMobile() ? 18 : 25;

      const candleCount =
        Math.ceil(width / spacing) + 30;

      /*
        Three separate chart zones.
      */

      const zones = [
        0.24,
        0.50,
        0.76
      ];

      zones.forEach(
        (zonePosition, lineIndex) => {

          const candles = [];

          let price =
            100 + Math.random() * 20;

          for (
            let i = 0;
            i < candleCount;
            i++
          ) {

            /*
              Each line has a slightly
              different market behaviour.
            */

            let wave;

            if (lineIndex === 0) {

              wave =
                Math.sin(i * 0.13) * 2.2 +
                Math.sin(i * 0.035) * 3.5;

            } else if (lineIndex === 1) {

              wave =
                Math.sin(i * 0.19) * 2.7 +
                Math.sin(i * 0.06) * 2.4;

            } else {

              wave =
                Math.sin(i * 0.09) * 2.4 +
                Math.sin(i * 0.025) * 4;
            }


            const movement =
              (Math.random() - 0.48) * 3;


            const open =
              price;


            const close =
              open +
              wave +
              movement;


            /*
              Realistic high / low.
            */

            const high =
              Math.max(
                open,
                close
              ) +
              1 +
              Math.random() * 3.5;


            const low =
              Math.min(
                open,
                close
              ) -
              1 -
              Math.random() * 3.5;


            candles.push({

              x:
                i * spacing,

              open,
              close,
              high,
              low,

              width:
                isMobile()
                  ? 7
                  : 10

            });


            price =
              close;
          }


          lines.push({

            candles,

            zone:
              height *
              zonePosition,

            speed:
              0.012 +
              lineIndex * 0.002

          });

        }
      );
    }


    /* =================================================
       DRAW THE THREE TRADING ZONES
       ================================================= */

    function drawZoneGuides() {

      ctx.save();

      ctx.strokeStyle =
        "rgba(255,255,255,0.055)";

      ctx.lineWidth = 1;

      lines.forEach(line => {

        ctx.beginPath();

        ctx.moveTo(
          0,
          line.zone
        );

        ctx.lineTo(
          width,
          line.zone
        );

        ctx.stroke();

      });

      ctx.restore();
    }


    /* =================================================
       DRAW HIGH / LOW RANGE MARKERS
       ================================================= */

    function drawHighLowLines(
      candles,
      top,
      bottom
    ) {

      if (!candles.length) return;

      let high =
        -Infinity;

      let low =
        Infinity;

      candles.forEach(candle => {

        high =
          Math.max(
            high,
            candle.high
          );

        low =
          Math.min(
            low,
            candle.low
          );

      });


      const range =
        Math.max(
          high - low,
          1
        );


      function priceToY(price) {

        return (
          bottom -
          (
            (price - low) /
            range
          ) *
          (bottom - top)
        );

      }


      const highY =
        priceToY(high);

      const lowY =
        priceToY(low);


      /*
        HIGH line
      */

      ctx.save();

      ctx.setLineDash([
        7,
        7
      ]);

      ctx.strokeStyle =
        "rgba(0,255,125,0.12)";

      ctx.beginPath();

      ctx.moveTo(
        0,
        highY
      );

      ctx.lineTo(
        width,
        highY
      );

      ctx.stroke();


      /*
        LOW line
      */

      ctx.strokeStyle =
        "rgba(255,55,65,0.12)";

      ctx.beginPath();

      ctx.moveTo(
        0,
        lowY
      );

      ctx.lineTo(
        width,
        lowY
      );

      ctx.stroke();

      ctx.restore();
    }


    /* =================================================
       DRAW ONE CANDLE
       ================================================= */

    function drawCandle(
      candle,
      line,
      scaleTop,
      scaleBottom,
      high,
      low
    ) {

      const range =
        Math.max(
          high - low,
          1
        );


      function priceToY(price) {

        return (
          scaleBottom -
          (
            (price - low) /
            range
          ) *
          (scaleBottom - scaleTop)
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
          bodyBottom -
          bodyTop,
          3
        );


      const green =
        "rgba(0,255,125,0.68)";

      const red =
        "rgba(255,45,55,0.68)";


      const greenGlow =
        "rgba(0,255,125,0.4)";

      const redGlow =
        "rgba(255,45,55,0.4)";


      const color =
        bullish
          ? green
          : red;


      ctx.save();

      /*
        Candle glow
      */

      ctx.shadowBlur = 9;

      ctx.shadowColor =
        bullish
          ? greenGlow
          : redGlow;


      /*
        Wick
      */

      ctx.beginPath();

      ctx.strokeStyle =
        color;

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


      /*
        Body
      */

      ctx.fillStyle =
        color;

      ctx.fillRect(

        candle.x -
        candle.width / 2,

        bodyTop,

        candle.width,

        bodyHeight

      );


      /*
        Fine candle border
      */

      ctx.shadowBlur = 0;

      ctx.strokeStyle =
        color;

      ctx.lineWidth = 0.8;

      ctx.strokeRect(

        candle.x -
        candle.width / 2,

        bodyTop,

        candle.width,

        bodyHeight

      );


      ctx.restore();

    }


    /* =================================================
       UPDATE MARKET
       ================================================= */

    function updateLine(line, delta) {

      const movement =
        delta * line.speed;


      line.candles.forEach(
        candle => {

          candle.x -=
            movement;

        }
      );


      /*
        Create a new candle when
        the last one approaches
        the right side.
      */

      const last =
        line.candles[
          line.candles.length - 1
        ];


      if (!last) return;


      const spacing =
        isMobile()
          ? 18
          : 25;


      if (
        last.x <
        width -
        spacing * 2
      ) {

        const open =
          last.close;


        /*
          Slightly different movement
          for each trading line.
        */

        const trend =
          Math.sin(
            Date.now() *
            (0.00008 + line.speed * 0.001)
          ) * 1.4;


        const close =
          open +
          trend +
          (
            Math.random() -
            0.48
          ) *
          2.5;


        const high =
          Math.max(
            open,
            close
          ) +
          1 +
          Math.random() * 3;


        const low =
          Math.min(
            open,
            close
          ) -
          1 -
          Math.random() * 3;


        line.candles.push({

          x:
            width + spacing,

          open,
          close,
          high,
          low,

          width:
            isMobile()
              ? 7
              : 10

        });
      }


      /*
        Remove candles that
        leave the screen.
      */

      while (
        line.candles.length &&
        line.candles[0].x <
        -60
      ) {

        line.candles.shift();

      }

    }


    /* =================================================
       DRAW EVERYTHING
       ================================================= */

    function draw() {

      ctx.clearRect(
        0,
        0,
        width,
        height
      );


      drawZoneGuides();


      lines.forEach(
        line => {

          if (
            !line.candles.length
          ) return;


          let high =
            -Infinity;

          let low =
            Infinity;


          line.candles.forEach(
            candle => {

              high =
                Math.max(
                  high,
                  candle.high
                );

              low =
                Math.min(
                  low,
                  candle.low
                );

            }
          );


          /*
            Each trading line gets
            its own vertical space.
          */

          const zoneHeight =
            height * 0.22;


          const top =
            line.zone -
            zoneHeight / 2;


          const bottom =
            line.zone +
            zoneHeight / 2;


          /*
            High / Low levels
          */

          drawHighLowLines(
            line.candles,
            top,
            bottom
          );


          /*
            Candles
          */

          line.candles.forEach(
            candle => {

              drawCandle(

                candle,

                line,

                top,

                bottom,

                high,

                low

              );

            }
          );

        }
      );

    }


    /* =================================================
       ANIMATION LOOP
       ================================================= */

    let previousTime = 0;

    function animate(time) {

      if (!previousTime) {

        previousTime =
          time;

      }


      const delta =
        Math.min(
          time -
          previousTime,
          40
        );


      previousTime =
        time;


      lines.forEach(
        line => {

          updateLine(
            line,
            delta
          );

        }
      );


      draw();


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
