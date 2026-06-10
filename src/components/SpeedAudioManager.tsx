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
  const hasInteractedRef = useRef<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);

  useEffect(() => {
    // 1. Capture early interaction instantly at any point during initialization
    const startPlaybackOnInteraction = () => {
      hasInteractedRef.current = true;
      
      // If player is fully loaded and ready, play instantly on this interaction
      if (playerRef.current && typeof playerRef.current.playVideo === "function") {
        if (!isPlayingRef.current) {
          playerRef.current.playVideo();
          isPlayingRef.current = true;
          cleanupInteractionListeners();
        }
      }
    };

    const cleanupInteractionListeners = () => {
      window.removeEventListener("click", startPlaybackOnInteraction);
      window.removeEventListener("touchstart", startPlaybackOnInteraction);
      window.removeEventListener("scroll", startPlaybackOnInteraction);
      window.removeEventListener("keydown", startPlaybackOnInteraction);
    };

    // Attach listeners immediately to capture instantaneous engagement
    window.addEventListener("click", startPlaybackOnInteraction, { capture: true });
    window.addEventListener("touchstart", startPlaybackOnInteraction, { passive: true, capture: true });
    window.addEventListener("scroll", startPlaybackOnInteraction, { passive: true, capture: true });
    window.addEventListener("keydown", startPlaybackOnInteraction, { capture: true });

    // 2. Load the YouTube IFrame Player API Script dynamically
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    // 3. Initialize Player when API is ready
    const initPlayer = () => {
      playerRef.current = new window.YT.Player("speed-hidden-player", {
        height: "1", // Must be 1 to bypass mobile browser blocking policies
        width: "1",  // Must be 1
        videoId: "vrY1THC_NQE", // Correct IShowSpeed Track ID
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: "vrY1THC_NQE", // Must match videoId to loop correctly
          playsinline: 1,
          disablekb: 1,
        },
        events: {
          onReady: () => {
            // Check if the user interacted with the page while the API script was downloading
            if (hasInteractedRef.current && playerRef.current && typeof playerRef.current.playVideo === "function") {
              playerRef.current.playVideo();
              isPlayingRef.current = true;
              cleanupInteractionListeners();
            }
          },
          onStateChange: (event: any) => {
            // Re-trigger if browser security forcefully paused or unstarted the playback state
            if ((event.data === window.YT.PlayerState.UNSTARTED || event.data === window.YT.PlayerState.PAUSED) && hasInteractedRef.current && !isPlayingRef.current) {
              playerRef.current.playVideo();
              isPlayingRef.current = true;
              cleanupInteractionListeners();
            }
          }
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    // 4. Mutation Observer: Watches for ChampionBanner mounting to instantly silence audio
    const observer = new MutationObserver(() => {
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