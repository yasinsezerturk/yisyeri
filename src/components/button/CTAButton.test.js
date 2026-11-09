import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";
import CTAButton from "./CTAButton";

it("başvuru bağlantısını klavyeyle odaklanabilir gerçek bağlantı olarak sunar", () => {
  render(<CTAButton href="https://example.com/basvuru">Başvuru</CTAButton>);
  const link = screen.getByRole("link", {name:"Başvuru"});
  expect(link).toHaveAttribute("href", "https://example.com/basvuru");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  userEvent.tab();
  expect(link).toHaveFocus();
});

it("eylem butonunu Enter ile çalıştırır ve içinde olduğu formu göndermez", () => {
  const action = vi.fn();
  const submit = vi.fn((event) => event.preventDefault());
  render(<form onSubmit={submit}><CTAButton onClick={action}>İşlemi aç</CTAButton></form>);
  userEvent.tab();
  userEvent.keyboard("{Enter}");
  expect(action).toHaveBeenCalledTimes(1);
  expect(submit).not.toHaveBeenCalled();
});
