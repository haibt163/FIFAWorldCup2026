"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: any;
  }
}

export default function SpeedAudioManager() {
  const playerRef = useRef<any>(null);
  const audioStartedRef = useRef<boolean>(false);

  useEffect(() => {
    // 1. Load the YouTube IFrame Player API Script dynamically
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    // 2. Initialize Player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("speed-hidden-player", {
        height: "1", // Must be 1, not 0, to bypass mobile browser blocking
        width: "1",  // Must be 1, not 0
        videoId: "vrY1THC_NQE", // Correct IShowSpeed Video ID
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: "vrY1THC_NQE", // Must match videoId to loop correctly
          playsinline: 1,
          disablekb: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    };

    const onPlayerReady = () => {
      // Setup browser gesture interaction listeners to bypass autoplay prevention models
      window.addEventListener("click", startPlaybackOnInteraction);
      window.addEventListener("touchstart", startPlaybackOnInteraction, { passive: true });
      window.addEventListener("scroll", startPlaybackOnInteraction, { passive: true });
    };

    const startPlaybackOnInteraction = () => {
      if (audioStartedRef.current) return;
      if (playerRef.current && typeof playerRef.current.playVideo === "function") {
        playerRef.current.playVideo();
        audioStartedRef.current = true;
        cleanupInteractionListeners();
      }
    };

    const cleanupInteractionListeners = () => {
      window.removeEventListener("click", startPlaybackOnInteraction);
      window.removeEventListener("touchstart", startPlaybackOnInteraction);
      window.removeEventListener("scroll", startPlaybackOnInteraction);
    };

    // 3. Mutation Observer: Watches for ChampionBanner mounting to instantly silence audio
    const observer = new MutationObserver(() => {
      // Scan DOM for champion pop-up component hooks safely
      const hasChampionBanner = 
        document.querySelector("[id*='champion']") || 
        document.querySelector("[class*='champion']") || 
        document.querySelector("[class*='Champion']");
        
      if (hasChampionBanner && playerRef.current && typeof playerRef.current.pauseVideo === "function") {
        playerRef.current.pauseVideo();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      cleanupInteractionListeners();
      observer.disconnect();
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0.01, pointerEvents: 'none', overflow: 'hidden' }}>
      <div id="speed-hidden-player" />
    </div>
  );
}