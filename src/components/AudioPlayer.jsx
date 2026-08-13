import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AudioPlayer = forwardRef(function AudioPlayer(_, ref) {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    useImperativeHandle(ref, () => ({
        play: async () => {
            try {
                await audioRef.current.play();
                setPlaying(true);
            } catch (err) {
                // Autoplay blocked — user gesture is what triggered this call anyway,
                // so this should normally succeed since it's called on tap.
                console.warn("Playback failed:", err);
            }
        },
    }));

    const toggle = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            audio.play();
            setPlaying(true);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true;
        audio.volume = 0.5;
    }, []);

    return (
        <>
            <audio ref={audioRef} src="/audio/wedding-music.mp3" preload="auto" />

            <button
                onClick={toggle}
                aria-label={playing ? "Mute music" : "Play music"}
                className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-deepBlue shadow-lg border-2 border-skyBlue flex items-center justify-center"
            >
                {playing ? (
                    <div className="flex items-end gap-[2.5px] h-4">
                        <span className="w-[2.5px] bg-skyBlue rounded-full animate-wave1 h-full" />
                        <span className="w-[2.5px] bg-skyBlue rounded-full animate-wave2 h-full" />
                        <span className="w-[2.5px] bg-skyBlue rounded-full animate-wave3 h-full" />
                    </div>
                ) : (
                    <VolumeX className="w-5 h-5 text-skyBlue" />
                )}
            </button>
        </>
    );
});

export default AudioPlayer;