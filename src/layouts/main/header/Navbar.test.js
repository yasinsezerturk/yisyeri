import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";

import { it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

it("mobil menünün açık durumunu bildirir ve Escape ile odağı düğmeye döndürür", () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  const button = screen.getByRole("button", {name:"Menüyü aç"});
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(document.getElementById(button.getAttribute("aria-controls"))).toBeInTheDocument();
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
  const menu = screen.getByRole("navigation", {name:"Mobil ana menü"});
  within(menu).getByRole("link", {name:"Hakkımızda"}).focus();
  fireEvent.keyDown(document, {key:"Escape"});
  expect(button).toHaveAccessibleName("Menüyü aç");
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("navigation", {name:"Mobil ana menü"})).not.toBeInTheDocument();
  expect(button).toHaveFocus();
});

it("menü bağlantısı seçilince mobil menüyü kapatır", () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  fireEvent.click(screen.getByRole("button", {name:"Menüyü aç"}));
  fireEvent.click(within(screen.getByRole("navigation", {name:"Mobil ana menü"})).getByRole("link", {name:"Hakkımızda"}));
  expect(screen.getByRole("button", {name:"Menüyü aç"})).toHaveAttribute("aria-expanded", "false");
});
