import { MapPin, Phone, Facebook, Twitter, Instagram } from "lucide-react";

import siteConfig from "../../config/siteConfig";


export default function Footer() {

  
  return (
    <footer className="bg-gray-900 text-gray-200 ">
      
      <div className="py-10 border-b border-gray-700">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo, Contact */}
          <div >
            <a href="/" className="flex  items-center py-5">
              <img src={siteConfig.LOGO} alt="Yeşil İşyeri" className="h-20 " />
            <h3 className="text-3xl font-bold text-white">Yeşil <br />İşyeri</h3>


            </a>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.CONTACT.ADDRESS)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {siteConfig.CONTACT.ADDRESS}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href={`tel:${siteConfig.CONTACT.PHONE}`} className="hover:underline">
                  {siteConfig.CONTACT.PHONE}
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg mb-2 border-b-4 border-blue-400 inline-block pb-1">
              {siteConfig.FOOTER.CONTENT_TITLE}
            </h3>
            <ul className="space-y-2">
              <li>

                <a
                  href={siteConfig.BELEDIYE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400"
                >
                  {siteConfig.BELEDIYE_NAME}
                </a>
              </li>
              <li> <a href={`${siteConfig.E_BELEDIYE_URL}`} target="_blank" rel="noreferrer" className="hover:text-blue-400"
                >{siteConfig.FOOTER_APP.IKI} </a>
              </li>
              <li> <a href="/iletisim" className="hover:text-blue-400">
                  {siteConfig.FOOTER_APP.CONTACT_TITLE} </a>
              </li>
              <li> <a href="/hakkimizda" className="hover:text-blue-400">
                  {siteConfig.FOOTER_APP.CONDITION} </a>
              </li>
            </ul>
          </div>

          {/* Social m. */}
          <div>
            <h3 className="text-lg mb-2 border-b-4 border-blue-400 inline-block pb-1">
               {siteConfig.FOOTER_APP.SOCIAL_TITLE}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Twitter className="w-5 h-5 text-blue-400" />
                <a
                  href={siteConfig.SOCIAL_LINKS.X}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                 {siteConfig.FOOTER_APP.X}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Instagram className="w-5 h-5 text-pink-400" />
                <a
                  href={siteConfig.SOCIAL_LINKS.INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {siteConfig.FOOTER_APP.INSTAGRAM}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Facebook className="w-5 h-5 text-blue-600" />
                <a
                  href={siteConfig.SOCIAL_LINKS.FACEBOOK}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                   {siteConfig.FOOTER_APP.FACEBOOK}
                </a>
              </li>
            </ul>
          </div>

          {/* About text */}
          <div>
            <h3 className="text-lg mb-2 border-b-4 border-blue-400 inline-block pb-1">
              {siteConfig.SITE_NAME}
            </h3>
            <p className="text-sm leading-relaxed text-justify">
              {siteConfig.FOOTER.DESCRIPTION}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="py-4 bg-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.BELEDIYE_NAME} - Tüm Hakları Saklıdır.
          </p>
          <ul className="flex space-x-4 mt-3 md:mt-0">
            <li>
              <a
                href={siteConfig.SOCIAL_LINKS.FACEBOOK}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-blue-500"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.SOCIAL_LINKS.X}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-pink-500"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
