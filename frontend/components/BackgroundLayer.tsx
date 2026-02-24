'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

interface BackgroundLayerProps {
    enabled: boolean;
    packId: string | null;
    entryUrl: string | null;
    interactive: boolean;
    config: Record<string, unknown>;
    quality: "low" | "med" | "high";
    reducedMotionOverride: boolean | null;
}

export function BackgroundLayer({
    enabled,
    packId,
    entryUrl,
    interactive,
    config,
    quality,
    reducedMotionOverride,
}: BackgroundLayerProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const iframeSrc = useMemo(() => {
        const baseUrl = packId
            ? `/api/background-packs/frame/${encodeURIComponent(packId)}`
            : entryUrl;
        if (!baseUrl) return null;
        const params = new URLSearchParams();
        params.set("quality", quality);
        const reducedMotion =
            reducedMotionOverride === null ? prefersReducedMotion : reducedMotionOverride;
        params.set("reducedMotion", reducedMotion ? "true" : "false");
        Object.entries(config || {}).forEach(([key, value]) => {
            if (["string", "number", "boolean"].includes(typeof value)) {
                params.set(key, String(value));
            }
        });
        const separator = baseUrl.includes("?") ? "&" : "?";
        return `${baseUrl}${params.toString() ? `${separator}${params.toString()}` : ""}`;
    }, [packId, entryUrl, config, quality, reducedMotionOverride, prefersReducedMotion]);

    useEffect(() => {
        if (!iframeRef.current) return;

        const postViewport = () => {
            const frame = iframeRef.current;
            if (!frame?.contentWindow) return;
            frame.contentWindow.postMessage(
                {
                    type: "VIEWPORT",
                    w: window.innerWidth,
                    h: window.innerHeight,
                    dpr: window.devicePixelRatio,
                },
                "*"
            );
        };

        const postConfig = () => {
            const frame = iframeRef.current;
            if (!frame?.contentWindow) return;
            frame.contentWindow.postMessage({ type: "CONFIG", ...config }, "*");
        };

        postViewport();
        postConfig();
        window.addEventListener("resize", postViewport);
        return () => window.removeEventListener("resize", postViewport);
    }, [config]);

    useEffect(() => {
        if (!interactive) return;

        const postPointer = (active: boolean, x?: number, y?: number) => {
            const frame = iframeRef.current;
            if (!frame?.contentWindow) return;
            frame.contentWindow.postMessage(
                { type: "POINTER", active, x: x ?? null, y: y ?? null },
                "*"
            );
        };

        const handlePointerMove = (event: PointerEvent) => {
            postPointer(true, event.clientX, event.clientY);
        };

        const handlePointerLeave = () => {
            postPointer(false);
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerdown", handlePointerMove, { passive: true });
        window.addEventListener("pointerleave", handlePointerLeave);
        window.addEventListener("blur", handlePointerLeave);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerdown", handlePointerMove);
            window.removeEventListener("pointerleave", handlePointerLeave);
            window.removeEventListener("blur", handlePointerLeave);
        };
    }, [interactive, iframeSrc]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
        handleChange();
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    if (!enabled || !entryUrl || !iframeSrc) {
        return <AnimatedBackground />;
    }

    return (
        <div className="fixed inset-0 z-0">
            <iframe
                ref={iframeRef}
                src={iframeSrc}
                title="Background"
                sandbox="allow-scripts"
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full"
                style={{ pointerEvents: interactive ? "auto" : "none" }}
            />
        </div>
    );
}
