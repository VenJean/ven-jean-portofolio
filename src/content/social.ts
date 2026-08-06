export type SocialLink = {
  label: string;
  href: string;
  isPlaceholder: boolean;
};

export type ResumeOption = {
  label: string;
  href: string;
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
];

// Two resume variants, picked by the visitor from a single "Resume" button —
// drop the actual PDFs into `public/` at these exact paths.
export const resumeOptions: ResumeOption[] = [
  { label: "CS & Moderator", href: "/resume-cs-moderator.pdf" },
  { label: "Developer", href: "/resume-developer.pdf" },
];
