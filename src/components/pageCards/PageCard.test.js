import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { it, expect } from "vitest";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import PageContainer from "./PageContainer";

function Detail() {
  const navigate = useNavigate();
  return <><h1>İşyeri detayı</h1><button onClick={() => navigate(-1)}>Geri</button></>;
}

it("işyeri kartından sonra bir kez geri dönüldüğünde listeyi gösterir", () => {
  render(<MemoryRouter initialEntries={["/isyerleri"]}>
    <Routes>
      <Route path="/isyerleri" element={<PageContainer partners={[{objectid:2,isyeri_unvani:"Örnek İşyeri",files:[]}]} />} />
      <Route path="/detay/:id" element={<Detail />} />
      <Route path="*" element={<h1>Sayfa bulunamadı</h1>} />
    </Routes>
  </MemoryRouter>);

  fireEvent.click(screen.getByRole("link", {name:/Örnek İşyeri/}));
  expect(screen.getByRole("heading", {name:"İşyeri detayı"})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", {name:"Geri"}));
  expect(screen.getByRole("link", {name:/Örnek İşyeri/})).toBeInTheDocument();
  expect(screen.queryByRole("heading", {name:"Sayfa bulunamadı"})).not.toBeInTheDocument();
});
