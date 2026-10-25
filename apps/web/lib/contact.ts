export const WHATSAPP_NUMBER = "817012905081";
export const WHATSAPP_DISPLAY = "+81 70-1290-5081";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export const whatsappHref = (message?: string): string => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
