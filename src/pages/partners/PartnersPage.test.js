import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PartnersPage from "./PartnersPage";
import { usePartners } from "../../hooks/UsePartners";

jest.mock("../../hooks/UsePartners");
jest.mock("../../layouts/Layout", () => ({children}) => <main>{children}</main>);
jest.mock("../../components/pageCards/PageContainer", () => ({partners}) => <div data-testid="partners">{partners.map((partner) => <span key={partner.objectid}>{partner.isyeri_unvani}</span>)}</div>);

const rows = (count) => Array.from({length:count}, (_,index) => ({objectid:index,isyeri_unvani:`İşyeri ${index}`}));

it("kayıt sayısı 10'un katı olduğunda son sayfada yüklemeyi bitirir", () => {
  usePartners.mockReturnValue({partners:rows(20),loading:false,error:null});
  render(<PartnersPage />);
  expect(screen.getByTestId("partners").children).toHaveLength(10);
  fireEvent.click(screen.getByRole("button",{name:"Daha Fazla Göster"}));
  expect(screen.getByTestId("partners").children).toHaveLength(20);
  expect(screen.queryByRole("button",{name:"Daha Fazla Göster"})).not.toBeInTheDocument();
});

it("servis kesintisini boş liste yerine tek bir hata olarak gösterir", () => {
  usePartners.mockReturnValue({partners:[],loading:false,error:"Servise erişilemiyor"});
  render(<PartnersPage />);
  expect(screen.getAllByText("Servise erişilemiyor")).toHaveLength(1);
  expect(screen.queryByText("Henüz veri bulunmamaktadır.")).not.toBeInTheDocument();
});
