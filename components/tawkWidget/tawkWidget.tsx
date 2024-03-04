// TawkWidget.tsx
"use client"
import React, { useEffect } from 'react';

const TawkWidget: React.FC = () => {
  useEffect(() => {
    const s0 = document.getElementsByTagName("script")[0];
    if (!s0) return; // Check if script element exists
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = 'https://embed.tawk.to/65b164fb0ff6374032c48309/1hkuf4up4';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode?.insertBefore(s1, s0); // Use optional chaining to prevent null error
  }, []);

  return null; // Tawk widget does not render any UI
};

export default TawkWidget;
