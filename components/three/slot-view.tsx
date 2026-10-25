"use client";

import { View } from "@react-three/drei";

import { AmbientScene, FrameScene, HeroScene, PlatformScene, StairsScene } from "./scenes";

export type SlotProps =
  | { scene: "hero"; rootId: string; anchorId: string; centerpiece?: boolean }
  | { scene: "stairs"; progressId: string }
  | { scene: "platform" }
  | { scene: "ambient"; seed?: number; count?: number }
  | { scene: "frame"; inset?: number };

function SceneFor(props: SlotProps) {
  switch (props.scene) {
    case "hero":
      return <HeroScene rootId={props.rootId} anchorId={props.anchorId} centerpiece={props.centerpiece} />;
    case "stairs":
      return <StairsScene progressId={props.progressId} />;
    case "platform":
      return <PlatformScene />;
    case "ambient":
      return <AmbientScene seed={props.seed} count={props.count} />;
    case "frame":
      return <FrameScene inset={props.inset} />;
  }
}

/** Tracks its parent box and renders the chosen scene into the shared canvas. */
export default function SlotView(props: SlotProps) {
  return (
    <View className="absolute inset-0">
      <SceneFor {...props} />
    </View>
  );
}
