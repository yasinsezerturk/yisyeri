import belediyeLogo from "../assets/logos/Belediye_Logo2.png";
import logo1 from "../assets/logos/Yesil_isyeri_logo1.png";
import logo2 from "../assets/logos/Yesil_isyeri_logo2.png";
import whiteYazi from "../assets/images/logo_yazi3.png";
import logo from "../assets/logos/Yesil_isyeri_logo.png";
import tescil from "../assets/images/tescil.png";

import heroVideo from "../assets/videos/yisyeriVideo.mp4";
import basindabiz from "../assets/videos/basindabiz.mp4";
import marsLojistikVideo from "../assets/videos/2026-255_Ruh-Mars_Lojstik_Uluslararasi_Tasimacilik.mp4";

import aboutImage1 from "../assets/images/about/Image1.jpg";
import aboutImage2 from "../assets/images/about/Image2.jpg";
import aboutImage3 from "../assets/images/about/Image3.jpg";



import president from "../assets/images/HasanAkgun.png";



const siteConfig = {



  
  PRESS_DATA: [
    { id: 1, title: "Show", video: basindabiz },
    { id: 2, title: "yesilisyeri", video: heroVideo },
    { id: 3, title: "Mars Lojistik Uluslararası Taşımacılık", video: marsLojistikVideo },
  ],
  PRESS_DATA_APP: {
    TITLE: "Basında Biz",
    SUBTITLE: "Basında Yeşil İşyeri ile ilgili çıkan haberler",
  },

  // Navbar
  NAVLINKS: [
    { NAME: "Ana Sayfa", TO: "/" },
    { NAME: "Başkan Hakkında", TO: "/baskan-hakkinda" },
    // { NAME: "Yeşil İşyeri", TO: "/isyerleri" },
    { NAME: "Hakkımızda", TO: "/hakkimizda" },
    { NAME: "Bize Ulaşın", TO: "/iletisim" },
    { NAME: "Logomuz", TO: "/logomuz" },
  ],


API:{
  OBJECT_ID: "vw_yesil_isyeri.objectid"

},
  //title: "Eşit İşyeri",
  //description: "Büyükçekmece Belediyesi Eşit İşyeri Projesi – kamu destekli eşit işyeri uygulamaları ve bilgiler.",
  // keywords: "Büyükçekmece, Eşit İşyeri, belediye, proje, destek, işyeri",
  //author: "Büyükçekmece Belediyesi",
  // themeColor: "#d63384",
  //url: "https://www.bcekmece.bel.tr", 
  //logoPath: "/esitisyeri-kalp-logo.png", 

  FOOTER_APP: {
    BIR: "",
    IKI: "E-Belediye",
    CONTACT_TITLE: "Bize Ulaşın",
    CONDITION: "Başvuru Şartları",
    SOCIAL_TITLE: "Sosyal Medya",
    FACEBOOK: "Facebook",
    X: "X hesabı",
    INSTAGRAM: "İnstagram",


  },
  FOOTER: {
    CONTENT_TITLE: "Ruhsat ve Denetim Müdürlüğü",
    DESCRIPTION: `Büyükçekmece Belediyesi olarak “Yeşil İşyeri Projesi” ile işletmelerimizi çevre dostu ve 
enerji verimli hale getiriyoruz. Projeyi tamamlayan işletmelerimize sertifikalar veriyor, 
vergi ve harçlarda indirimlerle destekliyoruz. 
Böylece hem çevreyi koruyor hem de işletmelerimizin enerji faturalarında tasarruf sağlıyoruz.`,



    UC: "",
    DORT: "",
  },
  SOCIAL_LINKS: {
    FACEBOOK: "https://tr-tr.facebook.com/Buyukcekmecebld",
    X: "https://x.com/BuyukcekmeceBld",
    INSTAGRAM: "https://www.instagram.com/buyukcekmecebld/#",

  },

  SITE_NAME: "Yeşil İşyeri",
  SITE_DESCRIPTION: "Büyükçekmece Belediyesi Yeşil İşyeri Projesi",
  SITE_DESCRIPTION_2: "Büyükçekmece Belediyesi Ruhsat ve Denetim Müdürlüğü",

  SITE_META_DESCRIPTION: "",
  KEYWORDS: "Büyükçekmece, Yeşil İşyeri, belediye, proje, destek, işyeri",
  AUTHOR: "Büyükçekmece Belediyesi",
  THEMECOLOR: "#d63384",


  BELEDIYE_NAME: "Büyükçekmece Belediyesi",
  BELEDIYE_URL: "https://bcekmece.bel.tr",
  E_BELEDIYE_URL: "https://ebelediye.bcekmece.bel.tr",

  LOGO: logo,
  LOGO2: belediyeLogo,
  SITE_LOGO: logo1,
  SITE_YAZISI: logo2,
  WHITE_TEXT: whiteYazi,
  HERO_HIGHLIGHT: "Projesi",
  CTATEXT: "İşyerinizi Kaydedin",
  CTAURL: "https://ulakbel.bcekmece.bel.tr/WebBasvuru/yesilisyeri#/",
  CTA2TEXT: "Bücep Grubuna Katılın",
  CTA2URL: "https://bucep.peerbie.com/X1Ft8OUiiXb",
  HERO_VIDEO: heroVideo,

  loading: "Yükleniyor...",

  PARTNERS: {
    SECTION_TITLE: "Yeşil İşyerleri",
    SITE_DESCRIPTION: "Çevre dostu üretim ve hizmet ilkelerini benimseyen işyerleri",

  },
  PRESS: {
    SECTION_TITLE: "basında Biz",
    SITE_DESCRIPTION: "",
  },


  CONTACT: {
    PHONE: "444 0 340",
    EMAİL: "danisma@bcekmece.bel.tr",
    ADDRESS: "Fatih Mahallesi Şehremini Sokak. No:1 A Blok Zemin Kat Büyükçekmece/İstanbul",
  },

  CONTACT_APP: {
    TITLE: "İletişime Geçin",
    DESCRIPTION: "Soru, görüş ve önerileriniz için aşağıdaki iletişim kanallarını kullanabilir veya iletişim formumuzu doldurabilirsiniz.",
    CONTACT_TİTLE: "İletişim Bilgileri",
    ADRESS: "Adres",
    PHONE: "Telefon",
    EMAİL: "E-posta",
    WORKİNG_TİME: "Çalışma Saatleri"

  },
  FORM_APP: {
    TİTLE: "İletişim Formu",
    DESCRIPTION: "İletişim formumuzu doldurmak için aşağıdaki butona tıklayarak ilgili sayfaya yönlendirileceksiniz.",
    BTN: "İletişim Formuna Git",
    SMALL_DESCRIPTION: "Form doldurma işlemi için harici bir sayfaya yönlendirileceksiniz.",
    NAME: "Adınız Soyadınız",
    EMAIL: "E-posta Adresiniz",
    MESSAGE: "Mesajınız"
  },





  DEFAULT_TEXTS: {
    NAME: "İsim yok",
    CONTACT: "Yetkili yok",
    ACTIVITY: "Faaliyet türü yok",
  },

  // LOGOMUZ
  BRAND: {
    TITLE: "Logomuz ve Marka Kimliğimiz",
    DESCRIPTION: "Yeşil İşyeri Projesi’nin logosu, çevre dostu dönüşümü, enerji verimliliğini ve sürdürülebilirliği temsil eder. Büyükçekmece Belediyesi tarafından geliştirilen bu ödüllü proje, doğaya duyarlı iş yerlerinin tanınması ve teşvik edilmesini amaçlamaktadır. Projemizin logosu ve marka tescil belgesi aşağıda sunulmuştur.",
  },

  LOGOS: [
    { id: 1, TITLE: "", IMAGE: logo },
    { id: 2, TITLE: "", IMAGE: tescil },
  ],

  form: {
    ctaButton: "https://ulakbel.bcekmece.bel.tr/WebBasvuru/yesilisyeri#/",
  },

  theme: {
    colors: {
      primary: "#004aad",
      secondary: "#00b4d8",
      gray: "#6b7280",
    },
  },



  partners: {
    list: {
      title: "Diğer İşyerleri",
      subtitle: "Benzer yeşil işyerlerini keşfedin",
      emptyMessage: "Gösterilecek işyeri bulunamadı",
      viewAllText: "Tümünü Görüntüle",
      viewAllLink: "/isyerleri",
    },
    detail: {
      detailPath: "/detay",
      messages: { partnerNotFound: "Firma bulunamadı...", },
      sections: {
        address: {
          title: "Adres Bilgisi",
          fields: {
            acik_adres: "Açık Adres",
            mahalle: "Mahalle",
            yol_adi: "Cadde/Sokak",
          },
        },
        map: {
          title: "Konum Haritası",
        },
        contact: {
          title: "İletişim Bilgileri",
          fields: {
            yetkili_kisi: "Yetkili Kişi",
            telefon: "Telefon",
            eposta: "E-posta",
          },
        },
        calisma_saati: {
          title: "Çalışma Saatleri",
        },
      },
    },

  },






  ABOUT_PRESIDENT: [
    {
      id: 1,
      TITLE: "BAŞKANIN MESAJI",
      TEXT: `Yeşil İşyeri projemizin amacı şehrimiz genelinde işyerlerinde enerji verimliliğini artırmak, 
      enerji kayıplarını önlemek veya en aza indirmek, çevre dostu önlemlerin uygulanmasını sağlamak ve 
farkındalık yaratmak amacıyla Yeşil İşyeri projesi başlatılmıştır. 
Yeşil İşyeri Projemiz ile şehrimizde bulunan işletmelerin faaliyetlerinde çevreci davranışlar hususunda 
bireysel hedefler koyulmasının, enerji tasarrufu, kazanımı ve çevrenin korunmasına yönelik olarak 
yapılacak denetimlerde enerji ve çevre konusunda daha verimli ve temiz olarak çalışmasını 
sağlamaktır.  
Enerji verimli ekipman ve sistem kullanımı, yalıtım, rehabilitasyon ve proses düzenleme gibi yollarla; 
gereksiz enerji kullanımının atık enerjinin, enerji kayıp ve kaçaklarının önlenmesi veya en aza 
indirilmesi ile birlikte atık enerjinin geri kazanılması ve çevre dostu önlemler gibi konulardaki 
çözümleri de kapsayan bir projedir. `,
      IMAGE: president,
    },
  ],

};

export default siteConfig;


export const ABOUT_DATA = [


  {
    id: 1,
    TITLE: "Yeşil İşyeri Nedir?",
    TEXT: `Büyükçekmece Belediyesi olarak; 
İşyerlerinde enerji verimliliğini artırmak, enerji kayıplarını önlemek veya en aza indirmek, çevre dostu önlemlerin uygulanmasını sağlamak ve farkındalık yaratmak amacıyla Yeşil İşyeri 
Projesi başlatılmıştır. `,
    IMAGE: aboutImage1,
  },

  {
    id: 2,
    TITLE: "Neden Almalıyım?",
    TEXT: `İşyerinin enerji verimliliğinde yapacağı iyileşmeye göre: 
-İyileşme %4 ile %10 arası ise Bronz Sertifika verilerek ruhsat ve tabela ücretlerinde %30 indirim sağlanacaktır. 
-İyileşme %10 ile %16 arası ise Gümüş Sertifika verilerek ruhsat ve tabela ücretlerinde %40 indirim sağlanacaktır. 
-İyileşme %16 ile %22 arası ise Altın Sertifika verilerek ruhsat ve tabela ücretlerinde %50 indirim sağlanacaktır. 
-İyileşme %22 ve üzerinde ise Platin Sertifika verilerek ruhsat ve tabela ücretlerinde %75 indirim sağlanacaktır.` ,
    IMAGE: aboutImage2,
  },

  {
    id: 3,
    TITLE: "Başvuru Şartları",
    TEXT: `Büyükçekmece ilçesindeki tüm işyerleri Yeşil İşyeri projesine müracaat edebilir. `,
    IMAGE: aboutImage3,
  }
];

export const ABOUT_DATA_APP= {
    TITLE: "Yeşil İşyerleri Projesi",
    SUBTITLE: "İşletmelerde çevre bilinci, sürdürülebilirlik ve enerji verimliliğini teşvik etmek için tasarlanmış kapsamlı bir çevre dostu dönüşüm programı"
};

