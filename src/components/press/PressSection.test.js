import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import PressSection from "./PressSection";

let showDescriptor;
let closeDescriptor;

beforeEach(() => {
  showDescriptor = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "showModal");
  closeDescriptor = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "close");
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", { configurable:true, value() { this.setAttribute("open", ""); } });
  Object.defineProperty(HTMLDialogElement.prototype, "close", { configurable:true, value() { this.removeAttribute("open"); } });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  if (showDescriptor) Object.defineProperty(HTMLDialogElement.prototype, "showModal", showDescriptor);
  else delete HTMLDialogElement.prototype.showModal;
  if (closeDescriptor) Object.defineProperty(HTMLDialogElement.prototype, "close", closeDescriptor);
  else delete HTMLDialogElement.prototype.close;
});

it("haber kartlarında video indirmeden kapakları ve adları sunar", () => {
  const {container} = render(<PressSection />);
  expect(container.querySelector("video")).toBeNull();
  expect(screen.getByRole("button", {name:"Show Haber videosunu izle"})).toBeInTheDocument();
  expect(container.querySelectorAll('img[loading="lazy"]')).toHaveLength(3);
});

it("haber videosunu Enter ile açar, kapatınca odağı ve sayfa kaydırmasını geri getirir", () => {
  render(<PressSection />);
  const trigger = screen.getByRole("button", {name:"Show Haber videosunu izle"});
  trigger.focus();
  userEvent.keyboard("{Enter}");
  expect(screen.getByRole("dialog", {name:"Show Haber"})).toBeInTheDocument();
  expect(screen.getByRole("button", {name:"Videoyu kapat"})).toHaveFocus();
  expect(document.querySelector("video")).toHaveAttribute("src", expect.stringContaining("show-news"));
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.click(screen.getByRole("button", {name:"Videoyu kapat"}));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(document.querySelector("video")).toBeNull();
  expect(trigger).toHaveFocus();
  expect(document.body.style.overflow).toBe("");
});

it("tarayıcının Escape/kapatma olayında videoyu kapatır", () => {
  render(<PressSection />);
  fireEvent.click(screen.getByRole("button", {name:"Yeşil İşyeri videosunu izle"}));
  fireEvent(screen.getByRole("dialog"), new Event("cancel", {cancelable:true}));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
