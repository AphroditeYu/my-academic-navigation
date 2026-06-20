import { useState, useRef, useEffect } from "react";

/* 音乐与封面图片均存放于 GitHub 仓库，通过直链引用 */
const BASE_URL = "https://raw.githubusercontent.com/AphroditeYu/my-site-assets/main";
const PLAYLIST_JSON_URL = `${BASE_URL}/playlist.json?t=${Date.now()}`; // 加时间戳防止缓存导致拿不到最新歌单

interface PlaylistEntry {
    title: string;
    artist: string;
    song: string;
    cover: string;
}

interface Track {
    title: string;
    artist: string;
    src: string;
    cover: string;
}

export default function MusicPlayer() {
    const [playlist, setPlaylist] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    // 运行时从 GitHub 仓库拉取 playlist.json，自动生成播放列表
    useEffect(() => {
        fetch(PLAYLIST_JSON_URL)
            .then((res) => {
                if (!res.ok) throw new Error("无法获取歌单");
                return res.json();
            })
            .then((data: PlaylistEntry[]) => {
                const tracks: Track[] = data.map((item) => ({
                    title: item.title,
                    artist: item.artist,
                    src: `${BASE_URL}/music/${item.song}`,
                    cover: `${BASE_URL}/music_cover/${item.cover}`,
                }));
                setPlaylist(tracks);
                setIsLoading(false);
            })
            .catch(() => {
                setLoadError(true);
                setIsLoading(false);
            });
    }, []);

    const song = playlist[currentIndex];

    // 切歌时自动播放
    useEffect(() => {
        if (audioRef.current && song) {
            audioRef.current.load();
            if (isPlaying) audioRef.current.play();
        }
    }, [currentIndex, song]);

    // 播放/暂停
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // 上一首
    const prevSong = () => {
        if (playlist.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    };

    // 下一首
    const nextSong = () => {
        if (playlist.length === 0) return;
        setCurrentIndex((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
    };

    // 进度条更新
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // 获取总时长
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // 点击进度条跳转
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    // 时间格式化 mm:ss
    const formatTime = (t: number) => {
        const m = Math.floor(t / 60).toString().padStart(2, "0");
        const s = Math.floor(t % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // 歌曲结束自动下一首
    const handleEnded = () => {
        nextSong();
    };

    // 加载中状态
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 transition-colors duration-300">
                <p className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1">
                    🎵 切换歌曲(SWITCH SONG)
                </p>
                <p className="text-xs text-slate-400">歌单加载中...</p>
            </div>
        );
    }

    // 加载失败或歌单为空
    if (loadError || playlist.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 transition-colors duration-300">
                <p className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1">
                    🎵 切换歌曲(SWITCH SONG)
                </p>
                <p className="text-xs text-slate-400">歌单暂不可用，请检查 playlist.json</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 transition-colors duration-300">

            {/* 顶部标题 */}
            <p className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1">
                🎵 切换歌曲(SWITCH SONG)
            </p>

            {/* 歌曲信息 */}
            <div className="flex items-center gap-3 mb-3">
                {/* 封面 */}
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white-400 flex-shrink-0">
                    <img
                        key={currentIndex}
                        src={song.cover}
                        alt="cover"
                        className="w-full h-full object-cover cover-animate"
                    />
                </div>
                {/* 歌名歌手 */}
                <div className="overflow-hidden">
                    <p className="font-black text-sm text-slate-900 truncate">{song.title}</p>
                    <p className="text-xs text-slate-400 truncate">{song.artist}</p>
                </div>
            </div>

            {/* 进度条 */}
            <div className="mb-1 group">
                <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 accent-pink-300 cursor-pointer [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:transition-opacity [&::-webkit-slider-thumb]:duration-200"
                />
            </div>

            {/* 控制按钮 */}
            <div className="flex items-center justify-between gap-2">
                <button
                    onClick={prevSong}
                    className="flex items-center gap-1 border-2 border-black rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-slate-100 transition-transform duration-100 active:scale-75"
                >
                    ⏮ 上一首
                </button>

                <button
                    onClick={togglePlay}
                    className="flex items-center gap-1 border-2 border-black rounded-lg px-4 py-1.5 text-xs font-bold bg-emerald-200 hover:bg-emerald-300 transition-transform duration-150 active:scale-75"
                >
                    {isPlaying ? "⏸ 暂停" : "▷ 播放"}
                </button>

                <button
                    onClick={nextSong}
                    className="flex items-center gap-1 border-2 border-black rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-slate-100 transition-transform duration-100 active:scale-75"
                >
                    下一首 ⏭
                </button>
            </div>

            {/* 隐藏的 audio 元素 */}
            <audio
                ref={audioRef}
                src={song.src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />
        </div>
    );
}
