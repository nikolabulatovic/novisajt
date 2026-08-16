/** Brand icons from https://github.com/homarr-labs/dashboard-icons (local copies in /public/icons). */

const badgeClassName =
  'w-14 h-14 mx-auto mb-4 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300';

type BrandBadgeProps = {
  className?: string;
};

function BrandIcon({
  src,
  className = badgeClassName,
}: {
  src: string;
  className?: string;
}) {
  return (
    // Decorative; parent button/link should provide accessible name.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      width={56}
      height={56}
    />
  );
}

export function WhatsAppBadge(props: BrandBadgeProps) {
  return <BrandIcon src="/icons/whatsapp.svg" {...props} />;
}

export function DiscordBadge(props: BrandBadgeProps) {
  return <BrandIcon src="/icons/discord.svg" {...props} />;
}

export function TelegramBadge(props: BrandBadgeProps) {
  return <BrandIcon src="/icons/telegram.svg" {...props} />;
}
