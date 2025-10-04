'use client'

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Plus, Play, Pause, Trash2, Wand2, Download } from 'lucide-react'
import type { Frame } from '@/lib/types';
import { EmojiPreview } from './emoji-preview';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type AnimationTimelineProps = {
  frames: Frame[];
  activeFrameId: string;
  setActiveFrameId: (id: string) => void;
  addFrame: () => void;
  deleteFrame: (id: string) => void;
  onSmoothAnimation: () => void;
  isSmoothing: boolean;
};

export default function AnimationTimeline({ frames, activeFrameId, setActiveFrameId, addFrame, deleteFrame, onSmoothAnimation, isSmoothing }: AnimationTimelineProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(2); // fps
    const [previewFrameIndex, setPreviewFrameIndex] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);
    
    // Animation loop
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && frames.length > 0) {
            interval = setInterval(() => {
                setPreviewFrameIndex(prev => (prev + 1) % frames.length);
            }, 1000 / animationSpeed);
        }
        return () => clearInterval(interval);
    }, [isPlaying, frames.length, animationSpeed]);

    // When frames change, ensure preview index is valid
    useEffect(() => {
        if (previewFrameIndex >= frames.length) {
            setPreviewFrameIndex(0);
        }
    }, [frames, previewFrameIndex]);

    // Scroll to active frame
    useEffect(() => {
        const activeFrameElement = document.getElementById(`frame-${activeFrameId}`);
        if (activeFrameElement) {
            activeFrameElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [activeFrameId]);

    const previewFrame = frames[previewFrameIndex] || frames.find(f => f.id === activeFrameId) || frames[0];
    
    return (
        <footer className="w-full shrink-0 border-t bg-card/80 backdrop-blur-sm">
            <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center container mx-auto">
                {/* Preview & Controls */}
                <div className="flex items-center justify-center md:justify-start gap-4 md:col-span-4 lg:col-span-3">
                    <div className="w-20 h-20 hidden md:block flex-shrink-0">
                        {previewFrame && <EmojiPreview frame={previewFrame} size={80} />}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </Button>
                        <div className="flex items-center gap-2 w-32">
                            <span className="text-xs text-muted-foreground w-12">{animationSpeed.toFixed(1)} fps</span>
                            <Slider
                                value={[animationSpeed]}
                                onValueChange={(val) => setAnimationSpeed(val[0])}
                                min={0.5}
                                max={10}
                                step={0.5}
                            />
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="w-full md:col-span-8 lg:col-span-9 flex items-center gap-4">
                    <ScrollArea className="w-full whitespace-nowrap" ref={timelineRef}>
                        <div className="flex items-center gap-3 py-4">
                            {frames.map((frame, index) => (
                                <div key={frame.id} id={`frame-${frame.id}`} className="relative group flex-shrink-0">
                                    <div
                                        className={cn(
                                            "w-24 h-24 rounded-lg bg-background flex items-center justify-center cursor-pointer transition-all border-2",
                                            activeFrameId === frame.id ? "border-primary shadow-lg" : "border-transparent hover:border-primary/50"
                                        )}
                                        onClick={() => {
                                            setActiveFrameId(frame.id)
                                            setIsPlaying(false)
                                        }}
                                    >
                                        <EmojiPreview frame={frame} size={70} />
                                    </div>
                                    <div className="absolute top-0 right-0 -mt-2 -mr-2 z-10">
                                        <Button 
                                            variant="destructive" size="icon" 
                                            className="w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                                            onClick={(e) => { e.stopPropagation(); deleteFrame(frame.id); }}>
                                            <Trash2 className="w-3 h-3"/>
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-muted text-muted-foreground text-xs rounded-full px-1.5 py-0.5 pointer-events-none">
                                        {index + 1}
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-24 h-24 flex-shrink-0 flex-col gap-1" onClick={addFrame}>
                                <Plus className="w-6 h-6 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Add Frame</span>
                            </Button>
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <div className="flex flex-col gap-2 pl-2 border-l">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={onSmoothAnimation} disabled={isSmoothing || frames.length < 2} size="icon">
                                        <Wand2 className={cn(isSmoothing && "animate-spin")} />
                                        <span className="sr-only">Smooth Animation</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Smooth with AI</p></TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                     <Button variant="secondary" disabled size="icon">
                                        <Download/>
                                        <span className="sr-only">Export GIF</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Export as GIF (coming soon)</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </footer>
    );
}
