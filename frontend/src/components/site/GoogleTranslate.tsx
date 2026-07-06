"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: Record<string, unknown>,
          id: string
        ) => void;
      };
    };
  }
}

export function GoogleTranslate() {
  useEffect(() => {
    // Inject the Google Translate init callback
    window.googleTranslateElementInit = () => {
      new window.google!.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "en,es,zh-CN,zh-TW,fr,de,ja,ko,ar,pt,ru,it,vi,th,id,hi,tr,nl,pl,sv",
          layout: 0, // SIMPLE layout
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Only inject script once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* Hidden Google Translate widget container */}
      <div id="google_translate_element" className="hidden" />

      {/* Custom styling to hide Google's banner/toolbar */}
      <style>{`
        .goog-te-banner-frame,
        .goog-te-balloon-frame,
        #goog-gt-tt,
        .goog-tooltip,
        .goog-tooltip:hover {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .skiptranslate {
          display: none !important;
        }
      `}</style>
    </>
  );
}
