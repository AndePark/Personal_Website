import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export default function BackgroundBeams({ children }) {
  const containerRef = useRef(null);
  const parentRef = useRef(null);

  const colors = [
    "from-blue-400 via-blue-600 to-blue-300/40",
    "from-purple-400 via-purple-600 to-purple-300/40",
    "from-green-400 via-green-600 to-green-300/40",
    "from-white-400 via-white-600 to-white-300/40",
    "from-pink-400 via-pink-600 to-pink-300/40",
    "from-yellow-400 via-yellow-600 to-yellow-300/40",
    "from-red-400 via-red-600 to-red-300/40",
    "from-cyan-400 via-cyan-600 to-cyan-300/40",
    "from-indigo-400 via-indigo-600 to-indigo-300/40",
    "from-teal-400 via-teal-600 to-teal-300/40",
  ];

  const beams = Array.from({ length: 15 }, (_, i) => {
    const colorClass = colors[Math.floor(Math.random() * colors.length)];
    return {
      initialX: `${(i / 15) * 100}vw`,
      translateX: `${(i / 15) * 100}vw`,
      duration: 4 + Math.random() * 3,
      repeatDelay: Math.random() * 3,
      delay: Math.random() * 2,
      className: ["h-6", "h-12", "h-20"][Math.floor(Math.random() * 3)],
      colorClass, // store the color for explosion
    };
  });

  return (
    <div
      ref={parentRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-neutral-950 -z-10"
    >
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}

      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full bg-neutral-800"
      />
    </div>
  );
}

function CollisionMechanism({ parentRef, containerRef, beamOptions }) {
  const beamRef = useRef(null);

  const [collision, setCollision] = useState({
    detected: false,
    coordinates: null,
  });

  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: { x: relativeX, y: relativeY },
          });

          setCycleCollisionDetected(true);
        }
      }
    };

    const interval = setInterval(checkCollision, 50);
    return () => clearInterval(interval);
  }, [cycleCollisionDetected]);

  useEffect(() => {
    if (collision.detected) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prev) => prev + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        className={`absolute top-20 h-14 w-px rounded-full bg-gradient-to-t ${beamOptions.colorClass} ${beamOptions.className || ""}`}
        initial={{ translateY: "-200px", translateX: beamOptions.initialX }}
        animate={{ translateY: "1800px", translateX: beamOptions.translateX }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
      />

      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            style={{
              left: collision.coordinates.x,
              top: collision.coordinates.y,
            }}
            colorClass={beamOptions.colorClass} // pass the beam color
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Explosion({ style, colorClass }) {
  const spans = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 80 - 40,
    y: Math.random() * -50 - 10,
  }));

  return (
    <div
      style={{ ...style, transform: "translate(-50%,-50%)" }}
      className="absolute z-50 h-2 w-2"
    >
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: span.x, y: span.y, opacity: 0 }}
          transition={{ duration: Math.random() * 1.5 + 0.5 }}
          className={`absolute h-1 w-1 rounded-full bg-gradient-to-t ${colorClass}`} // use beam color
        />
      ))}
    </div>
  );
}
