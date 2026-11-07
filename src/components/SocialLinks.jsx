const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/_cuizon29?stkn=MW1yNzFjMjl4Mm9i',
    icon: (
      <>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          ry="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Khertcuizon',
    icon: (
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/khert.cuizon.2025',
    icon: (
      <path
        fill="currentColor"
        d="M8.051 16v-7H5.5V6h2.551V4.291C8.051 1.742 9.612 0 12.296 0H14.5v3h-1.338c-1.173 0-1.611.726-1.611 1.47V6H14.5l-.5 3h-2.449v7H8.051Z"
      />
    ),
  },
];

function SocialLinks({ footer = false }) {
  return (
    <div className={`social-icons${footer ? ' footer-socials' : ''}`}>
      {socialLinks.map(({ label, href, icon }) => (
        <a
          key={label}
          aria-label={label}
          className="social-icon"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox={label === 'Facebook' ? '0 0 16 16' : '0 0 24 24'}
            aria-hidden="true"
          >
            {icon}
          </svg>
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
