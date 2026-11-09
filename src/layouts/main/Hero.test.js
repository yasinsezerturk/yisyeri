import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import Hero from "./Hero";

let connectionDescriptor;

beforeEach(() => {
  connectionDescriptor = Object.getOwnPropertyDescriptor(navigator, "connection");
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  if (connectionDescriptor) Object.defineProperty(navigator, "connection", connectionDescriptor);
  else delete navigator.connection;
});

function mediaEnvironment({ desktop = true, pointerFine = true, reduce = false, saveData = false, effectiveType = "4g" }) {
  vi.stubGlobal("matchMedia", (query) => ({
    matches: query.includes("min-width") ? desktop : query.includes("prefers-reduced-motion") ? reduce : pointerFine,
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
  }));
  Object.defineProperty(navigator, "connection", {
    configurable: true,
    value: { saveData, effectiveType, addEventListener: vi.fn(), removeEventListener: vi.fn() },
  });
}

it.each([
  ["mobil ekranda", {desktop:false}],
  ["dokunmatik geniş ekranda", {pointerFine:false}],
  ["azaltılmış harekette", {reduce:true}],
  ["veri tasarrufunda", {saveData:true}],
  ["yavaş bağlantıda", {effectiveType:"3g"}],
])("%s arka plan videosunu bağlamaz, kapak görselini korur", (_, options) => {
  mediaEnvironment(options);
  const {container} = render(<Hero />);
  expect(container.querySelector("video")).toBeNull();
  expect(container.querySelector("img")).toHaveAttribute("src", expect.stringContaining("hero-poster"));
});

it("masaüstü arka plan videosunu kullanıcı duraklatıp yeniden oynatabilir", () => {
  mediaEnvironment({});
  render(<Hero />);
  fireEvent.click(screen.getByRole("button", {name:"Arka plan videosunu duraklat"}));
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  expect(screen.getByRole("button", {name:"Arka plan videosunu oynat"})).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", {name:"Arka plan videosunu oynat"}));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
});

it("uygun masaüstü bağlantısında yalnızca kısa sessiz arka plan videosunu kullanır", () => {
  mediaEnvironment({});
  const {container} = render(<Hero />);
  const video = container.querySelector("video");
  expect(video).toHaveAttribute("src", expect.stringContaining("hero-loop"));
  expect(video).toHaveAttribute("preload", "none");
  expect(video).toHaveAttribute("loop");
  expect(video.muted).toBe(true);
});
