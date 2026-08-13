import { useRef, useEffect, useState, useCallback } from "react";
import confetti from "canvas-confetti";

let heartIdCounter = 0;

export default function ScratchCard() {
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);
    const isDrawing = useRef(false);
    const [revealed, setRevealed] = useState(false);
    const [hearts, setHearts] = useState([]);
    const confettiFired = useRef(false);
    const lastHeartTime = useRef(0);

    const drawOverlay = useCallback((ctx, width, height) => {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#BFE0F5");
        gradient.addColorStop(0.5, "#4FA8DA");
        gradient.addColorStop(1, "#1B3F73");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.font = "600 15px Montserrat, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("SCRATCH TO REVEAL THE DATE", width / 2, height / 2);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            const rect = wrapper.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            drawOverlay(ctx, canvas.width, canvas.height);
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [drawOverlay]);

    const getPos = (e, canvas) => {
        const rect = canvas.getBoundingClientRect();
        const point = e.touches ? e.touches[0] : e;
        return {
            x: point.clientX - rect.left,
            y: point.clientY - rect.top,
        };
    };

    const spawnHeart = (x, y) => {
        const now = Date.now();
        if (now - lastHeartTime.current < 120) return; // throttle trail density
        lastHeartTime.current = now;

        const id = heartIdCounter++;
        setHearts((prev) => [...prev, { id, x, y }]);
        setTimeout(() => {
            setHearts((prev) => prev.filter((h) => h.id !== id));
        }, 900);
    };

    const scratch = (e) => {
        if (!isDrawing.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { x, y } = getPos(e, canvas);

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();

        spawnHeart(x, y);
        checkProgress(ctx, canvas);
    };

    const heartBoom = () => {
        const heartShape = confetti.shapeFromText({ text: "💙", scalar: 2.5 });
        const blueShape = confetti.shapeFromText({ text: "💎", scalar: 2 });

        confetti({
            particleCount: 60,
            spread: 90,
            startVelocity: 35,
            origin: { y: 0.6 },
            shapes: [heartShape],
            scalar: 2.5,
        });
        confetti({
            particleCount: 30,
            spread: 100,
            startVelocity: 25,
            origin: { y: 0.6 },
            shapes: [blueShape],
            scalar: 1.8,
            colors: ["#4FA8DA", "#1B3F73", "#2E6DB4"],
        });
    };

    const checkProgress = (ctx, canvas) => {
        if (revealed) return;
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparent = 0;
        for (let i = 3; i < data.length; i += 4) {
            if (data[i] === 0) transparent++;
        }
        const percent = transparent / (data.length / 4);

        if (percent > 0.5) {
            setRevealed(true);
            if (!confettiFired.current) {
                confettiFired.current = true;
                heartBoom();
            }
        }
    };

    const start = (e) => {
        isDrawing.current = true;
        scratch(e);
    };
    const stop = () => {
        isDrawing.current = false;
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div
                ref={wrapperRef}
                className="relative w-full h-40 rounded-xl overflow-hidden shadow-lg border border-skyBlue/50 bg-cream"
            >
                {/* Hidden date layer */}
                <div className="absolute inset-0 flex items-center justify-between gap-2 px-5 sm:px-7 bg-gradient-to-br from-deepBlue to-[#0F274D]">
                    <div className="text-center flex-shrink-0">
                        <p className="font-serif text-3xl sm:text-4xl text-skyBlue leading-none">24</p>
                    </div>
                    <div className="text-center border-x border-skyBlue/40 px-3 sm:px-6 flex-shrink-0">
                        <p className="font-sans tracking-[0.15em] sm:tracking-[0.2em] text-white text-xs sm:text-sm whitespace-nowrap">
                            SEPTEMBER
                        </p>
                    </div>
                    <div className="text-center flex-shrink-0">
                        <p className="font-serif text-3xl sm:text-4xl text-skyBlue leading-none">2026</p>
                    </div>
                </div>

                {/* Floating heart trail */}
                {hearts.map((h) => (
                    <span
                        key={h.id}
                        className="absolute pointer-events-none text-xl animate-floatUp"
                        style={{ left: h.x - 10, top: h.y - 10 }}
                    >
                        💙
                    </span>
                ))}

                {/* Scratchable canvas overlay */}
                {!revealed && (
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full touch-none cursor-pointer"
                        onMouseDown={start}
                        onMouseMove={scratch}
                        onMouseUp={stop}
                        onMouseLeave={stop}
                        onTouchStart={start}
                        onTouchMove={scratch}
                        onTouchEnd={stop}
                    />
                )}
            </div>
            <p className="text-center font-sans text-xs text-deepBlue/60 mt-2 tracking-wide">
                {revealed ? "Save the Date 💙" : "Swipe your finger across to reveal"}
            </p>
        </div>
    );
}