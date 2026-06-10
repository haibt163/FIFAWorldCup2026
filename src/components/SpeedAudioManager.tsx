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
  const isPlayingRef = useRef<boolean>(false);
  const isReadyRef = useRef<boolean>(false);

  useEffect(() => {
    const tryPlayVideo = () => {
      if (isReadyRef.current && playerRef.current && typeof playerRef.current.playVideo === "function") {
        if (!isPlayingRef.current) {
          playerRef.current.playVideo();
        }
      }
    };

    const onInteraction = () => {
      tryPlayVideo();
    };

    // Attach listeners - 'touchend' and 'pointerdown' are highly reliable on mobile viewports
    const events = ["click", "touchstart", "touchend", "pointerdown", "keydown"];
    events.forEach(event => window.addEventListener(event, onInteraction, { passive: true, capture: true }));

    const cleanupInteractionListeners = () => {
      events.forEach(event => window.removeEventListener(event, onInteraction, { capture: true }));
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    const initPlayer = () => {
      playerRef.current = new window.YT.Player("speed-hidden-player", {
        height: "10", // 10px bypasses strict mobile invisible-frame blocks
        width: "10",
        videoId: "vrY1THC_NQE",
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: "vrY1THC_NQE", 
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          rel: 0,
        },
        events: {
          onReady: () => {
            isReadyRef.current = true;
            // Attempt autoplay immediately; if browser blocks it, the interaction listeners will catch the user's next tap.
            playerRef.current.playVideo();
          },
          onStateChange: (event: any) => {
            // Only clean up interaction listeners once playback is fully verified
            if (event.data === window.YT.PlayerState.PLAYING) {
              isPlayingRef.current = true;
              cleanupInteractionListeners();
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.UNSTARTED) {
              isPlayingRef.current = false;
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

    const observer = new MutationObserver(() => {
      const hasChampionBanner = 
        document.querySelector("[id*='champion']") || 
        document.querySelector("[class*='champion']") || 
        document.querySelector("[class*='Champion']");
        
      if (hasChampionBanner && playerRef.current && typeof playerRef.current.pauseVideo === "function") {
        playerRef.current.pauseVideo();
        isPlayingRef.current = false;
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
    <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '10px', height: '10px', opacity: 0.01, pointerEvents: 'none', overflow: 'hidden' }}>
      <div id="speed-hidden-player" />
    </div>
  );
}