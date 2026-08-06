export type SocialLink = {
  label: string;
  href: string;
  isPlaceholder: boolean;
};

// WhatsApp and Email are the only channels here with an official way to
// pre-fill a message via URL — LinkedIn/Instagram/Telegram have no equivalent
// for a personal profile, so they stay as plain profile links.
const OPENING_MESSAGE = "Hi Ven Jean, I'm interested in discussing a potential collaboration with you.";
const encodedMessage = encodeURIComponent(OPENING_MESSAGE);

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/colonel-caesar-sancho-ven-jean-38a788240/",
    isPlaceholder: false,
  },
  {
    label: "Email",
    href: `mailto:venjean.work@gmail.com?subject=${encodeURIComponent("Collaboration Inquiry")}&body=${encodedMessage}`,
    isPlaceholder: false,
  },
  { label: "Instagram", href: "https://www.instagram.com/jean.fundedpartner/", isPlaceholder: false },
  { label: "Telegram", href: "https://t.me/luo_zhuo", isPlaceholder: false },
  { label: "WhatsApp", href: `https://wa.me/62895344643800?text=${encodedMessage}`, isPlaceholder: false },
  { label: "Resume", href: "/resume.pdf", isPlaceholder: true },
];
