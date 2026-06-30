import { Microphone, Upload, X } from "@phosphor-icons/react";
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
  type ReactElement,
  type DragEvent as ReactDragEvent,
  type ChangeEvent as ReactChangeEvent,
  Children,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/cn";

/* ── AIVoiceInput — microphone recording UI ── */

interface AIVoiceInputProps {
  onStart?: () => void;
  onStop?: (duration: number) => void;
  visualizerBars?: number;
  className?: string;
}

export function AIVoiceInput({
  onStart,
  onStop,
  visualizerBars = 48,
  className,
}: AIVoiceInputProps) {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (submitted) {
      onStart?.();
      intervalId = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      onStop?.(time);
      setTime(0);
    }
    return () => clearInterval(intervalId);
  }, [submitted, time, onStart, onStop]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = () => setSubmitted((prev) => !prev);

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center gap-2">
        <button
          className={cn(
            "group grid h-16 w-16 place-items-center rounded-xl transition-colors active:scale-[0.96]",
            submitted ? "" : "hover:bg-[var(--inset)]",
          )}
          type="button"
          onClick={handleClick}
        >
          {submitted ? (
            <div
              className="h-6 w-6 cursor-pointer rounded-sm bg-foreground animate-spin pointer-events-auto"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <Microphone
              className="h-6 w-6 text-muted-foreground"
              weight="fill"
            />
          )}
        </button>

        <span
          className={cn(
            "font-mono text-sm tabular-nums transition-opacity duration-300",
            submitted ? "text-foreground/70" : "text-muted-foreground/40",
          )}
        >
          {formatTime(time)}
        </span>

        <div className="flex h-4 w-64 items-center justify-center gap-0.5">
          {[...Array(visualizerBars)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                submitted
                  ? "bg-foreground/50 animate-pulse"
                  : "bg-muted-foreground/15 h-1",
              )}
              style={
                submitted && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className="h-4 text-xs text-muted-foreground/70">
          {submitted ? "Listening..." : "Click to speak"}
        </p>
      </div>
    </div>
  );
}

/* ── AudioUploadCard — drag & drop audio upload ── */

interface WaveformProps {
  width?: number;
  height?: number;
  bars?: number;
}

function Waveform({ width = 300, height = 40, bars = 60 }: WaveformProps) {
  const [barsArray, setBarsArray] = useState<ReactElement[]>([]);

  useEffect(() => {
    const barWidth = (width / bars) * 0.5;
    const spacing = (width / bars) * 0.4;
    const centerY = height / 2;
    const cornerRadius = barWidth * 0.7;
    const totalBarsWidth = (barWidth + spacing) * bars - spacing;
    const startX = (width - totalBarsWidth) / 2;
    const newBars: React.ReactElement[] = [];

    for (let i = 0; i < bars; i++) {
      const x = startX + i * (barWidth + spacing);
      const barHeight = Math.random() * (height * 0.6) + height * 0.1;
      const topY = centerY - barHeight / 2;
      newBars.push(
        <rect
          key={i}
          x={x}
          y={topY}
          width={barWidth}
          height={barHeight}
          rx={cornerRadius}
          ry={cornerRadius}
          fill="currentColor"
          className="text-muted-foreground/60"
        />,
      );
    }
    setBarsArray(newBars);
  }, [width, height, bars]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {barsArray}
    </svg>
  );
}

interface UploadCardBaseProps {
  children?: ReactNode;
  className?: string;
  isDragOver?: boolean;
  isUploading?: boolean;
}

function UploadCardBase({
  children,
  className,
  isDragOver = false,
  isUploading = false,
}: UploadCardBaseProps) {
  const hasChildren = Children.count(children) > 0;
  return (
    <div
      className={cn(
        "relative flex min-h-[120px] items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors duration-200",
        isDragOver
          ? "border-foreground/40 bg-[var(--inset)]/60 shadow-inner"
          : isUploading
            ? "border-foreground/30 bg-foreground/5"
            : "border-border/60 bg-background",
        !isUploading && "cursor-pointer hover:bg-[var(--inset)]/30",
        className,
      )}
    >
      {!hasChildren && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Upload
            size={48}
            className={cn(
              "transition-colors duration-200",
              isDragOver ? "text-foreground" : "text-muted-foreground/40",
              isUploading && "text-foreground",
            )}
          />
        </div>
      )}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

function truncateFilename(filename: string, maxLength = 20) {
  if (filename.length <= maxLength) return filename;
  const ext = filename.split(".").pop();
  const name = filename.replace(`.${ext}`, "");
  const truncated = name.substring(0, maxLength - 3 - (ext?.length ?? 0));
  return `${truncated}...${ext}`;
}

interface AudioComponentProps {
  isAnimating: boolean;
  filename?: string;
  onRemove?: () => void;
}

function AudioComponent({
  isAnimating,
  filename = "audio.mp3",
  onRemove,
}: AudioComponentProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isAnimating) setShouldShow(true);
  }, [isAnimating]);

  if (!shouldShow && !isRemoving) return null;

  const displayName = truncateFilename(filename);
  const handleRemove = () => setIsRemoving(true);
  const handleRemoveComplete = () => {
    setShouldShow(false);
    setIsRemoving(false);
    onRemove?.();
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="absolute z-20"
          initial={{ right: 20, bottom: 20, opacity: 0 }}
          animate={
            isRemoving
              ? {
                  scale: 0,
                  opacity: 0,
                  filter: "blur(8px)",
                  transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                }
              : {
                  left: "50%",
                  top: "calc(50% - 15px)",
                  x: "-50%",
                  y: "-50%",
                  opacity: 1,
                  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                }
          }
          exit={{
            scale: 0,
            opacity: 0,
            filter: "blur(8px)",
            transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
          }}
          style={{ transformOrigin: "center" }}
          onAnimationComplete={isRemoving ? handleRemoveComplete : undefined}
        >
          <motion.div
            initial={{ scale: 1.5 }}
            animate={
              isRemoving
                ? { scale: 0, transition: { duration: 0.4 } }
                : {
                    scale: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.68, -0.55, 0.265, 1.55],
                    },
                  }
            }
            className="group relative rounded-lg border border-border/30 bg-[var(--inset)] px-2 py-1.5 shadow-lg backdrop-blur-sm"
          >
            <button
              onClick={handleRemove}
              className="absolute -right-2 -top-2 z-30 grid h-5 w-5 place-items-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:scale-110"
            >
              <X size={12} />
            </button>
            <div className="flex w-full items-center justify-center">
              <Waveform width={180} height={32} bars={40} />
            </div>
            <div>
              <span className="text-left text-xs font-medium text-foreground/60">
                {displayName}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface AudioUploadCardProps {
  className?: string;
  title?: string;
  description?: string;
}

export function AudioUploadCard({
  className,
  title = "Upload audio",
  description = "Drop in your recordings and start transcribing instantly.",
}: AudioUploadCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: ReactDragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: ReactDragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: ReactDragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const audioFile = files.find((f) => f.type.startsWith("audio/"));
    if (audioFile) {
      setUploadedFile(audioFile);
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setIsAnimating(true);
      }, 200);
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: ReactChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("audio/")) {
        setUploadedFile(file);
        setIsUploading(true);
        setTimeout(() => {
          setIsUploading(false);
          setIsAnimating(true);
        }, 200);
      }
    },
    [],
  );

  const handleRemoveFile = useCallback(() => {
    setUploadedFile(null);
    setIsAnimating(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleBaseClick = useCallback(() => {
    if (!isUploading && !uploadedFile) fileInputRef.current?.click();
  }, [isUploading, uploadedFile]);

  return (
    <motion.div
      className={cn("relative mx-auto w-full max-w-md", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-background p-6 text-center">
        <div className="flex flex-col justify-center space-y-8">
          <div className="relative mx-auto w-full">
            <div
              className="relative"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleBaseClick}
            >
              <UploadCardBase
                isDragOver={isDragOver}
                isUploading={isUploading}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="sr-only"
              />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-left text-lg font-semibold text-foreground">
              {title}
            </h2>
            <p className="text-left text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <AudioComponent
          isAnimating={isAnimating}
          filename={uploadedFile?.name}
          onRemove={handleRemoveFile}
        />
      </div>
    </motion.div>
  );
}
