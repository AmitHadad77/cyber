"use client";

import { useEffect, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/972501234567?text=%D7%94%D7%99%D7%99%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%93%D7%91%D7%A8%20%D7%A2%D7%9C%20%D7%91%D7%A0%D7%99%D7%99%D7%AA%20%D7%90%D7%AA%D7%A8";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.45);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="שליחת הודעה ב-WhatsApp"
      className={`floatingWhatsapp ${show ? "is-visible" : ""}`}
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M19.11 17.24c-.28-.14-1.63-.8-1.88-.89-.25-.09-.43-.14-.61.14-.18.28-.7.89-.86 1.07-.16.18-.32.21-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.38-1.66-1.54-1.94-.16-.28-.02-.43.12-.56.13-.13.28-.32.41-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.46.07-.7.35-.24.28-.92.9-.92 2.2s.94 2.56 1.07 2.74c.14.18 1.85 2.83 4.49 3.96.63.27 1.13.43 1.51.55.63.2 1.2.17 1.65.1.5-.07 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.11-.25-.18-.53-.32Z"
        />
        <path
          fill="currentColor"
          d="M16.02 3.2c-6.97 0-12.62 5.63-12.62 12.57 0 2.22.58 4.39 1.69 6.31L3.3 28.8l6.89-1.79a12.68 12.68 0 0 0 5.83 1.48h.01c6.96 0 12.61-5.63 12.61-12.57S22.99 3.2 16.02 3.2Zm0 22.99h-.01a10.52 10.52 0 0 1-5.36-1.47l-.38-.22-4.09 1.06 1.09-3.98-.25-.41a10.33 10.33 0 0 1-1.59-5.49c0-5.72 4.69-10.38 10.46-10.38 2.79 0 5.41 1.08 7.39 3.03a10.3 10.3 0 0 1 3.06 7.35c0 5.72-4.69 10.38-10.32 10.38Z"
        />
      </svg>
    </a>
  );
}