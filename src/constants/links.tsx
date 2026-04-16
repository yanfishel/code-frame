import { FacebookIcon, LinkedInIcon, TwitterIcon, WhatsAppIcon } from '@/src/assets/icons';


export const SHARE_LINKS = [
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    link: 'https://www.linkedin.com/shareArticle?mini=true&url=***URL***&text=***TEXT***',
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon />,
    link: 'https://www.facebook.com/sharer/sharer.php?u=***URL***',
  },
  {
    name: 'Twitter',
    icon: <TwitterIcon />,
    link: 'https://twitter.com/intent/tweet?url=***URL***&text=***TEXT***!',
  },
  {
    name: 'WhatsApp',
    icon: <WhatsAppIcon />,
    link: 'https://wa.me/?text=***TEXT***:%20***URL***',
  },
];