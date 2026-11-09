import React from "react";
import { render, screen } from "@testing-library/react";

import { it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";
import siteConfig from "../config/siteConfig";

vi.mock("./main/header/Header", () => ({default: () => <header />}));
vi.mock("./main/Footer", () => ({default: () => <footer />}));

it("topluluk ve başvuru bağlantılarını kendi adları ve adresleriyle gösterir", () => {
  render(<MemoryRouter initialEntries={["/iletisim"]}><Layout>İçerik</Layout></MemoryRouter>);
  expect(screen.getByRole("link", {name:siteConfig.CTA2TEXT})).toHaveAttribute("href", siteConfig.CTA2URL);
  expect(screen.getByRole("link", {name:siteConfig.CTATEXT})).toHaveAttribute("href", siteConfig.CTAURL);
});
