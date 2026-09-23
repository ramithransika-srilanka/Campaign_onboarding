import { useEffect, useRef, type ReactNode } from 'react';

// Chat bubbles and pop-in animation ported from the "It's very uncomplicated." section
// of the Polysocial home page (Polysocial-mobile/index.html #chat), with campaign copy.

// Delay between bubbles that appear at the same time.
const STAGGER_MS = 140;
// The first bubbles wait for the screen heading to fade in.
const HEADING_LEAD_MS = 260;

const asset = (name: string) => `${import.meta.env.BASE_URL}chat/${name}`;

function UserAvatar() {
  return (
    <picture>
      <source type="image/avif" srcSet={asset('user-avatar.avif')} />
      <source type="image/webp" srcSet={asset('user-avatar.webp')} />
      <img className="chat-avatar" src={asset('user-avatar.png')} alt="" width={120} height={120} />
    </picture>
  );
}

function PolysocialAvatar() {
  return <img className="chat-avatar" src={asset('polysocial.svg')} alt="Polysocial" />;
}

type Side = 'l' | 'r';

type Message = {
  side: Side;
  text: ReactNode;
  /** First bubble of a group gets extra space above it. */
  groupStart?: boolean;
  /** Last bubble of a group shows the avatar and a tail corner. */
  groupEnd?: boolean;
  wide?: boolean;
  /** Keep a short line from wrapping one word onto its own line. */
  oneLine?: boolean;
};

// A creator (right) asks Polysocial (left) how the campaign works.
const MESSAGES: Message[] = [
  { side: 'r', text: 'How does it work?', groupStart: true, groupEnd: true },
  { side: 'l', text: 'Go to the campaign', groupStart: true },
  { side: 'l', text: 'Create content as mentioned in the campaign', wide: true },
  { side: 'l', text: 'Submit your content', groupEnd: true },
  { side: 'r', text: 'How much can I earn?', groupStart: true, groupEnd: true },
  { side: 'l', text: 'Earn up to Rs. 40,000 per content', groupStart: true, oneLine: true },
  { side: 'l', text: 'You get paid based on the reach of your content, at the end of the campaign', groupEnd: true, wide: true },
];

export default function HowItWorksChat() {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const msgs = Array.from(chatRef.current?.querySelectorAll<HTMLElement>('.msg') ?? []);
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      msgs.forEach((m) => m.classList.add('in'));
      return;
    }
    // Same trigger as the home page (35% visible, 8% up from the bottom), shifted up
    // by the sticky footer so a bubble pops as it clears the "Go to Campaign" button.
    const footer = document.querySelector<HTMLElement>('.screen__footer');
    const bottomInset = Math.round(window.innerHeight * 0.08 + (footer?.offsetHeight ?? 0));
    let isFirstBatch = true;
    const io = new IntersectionObserver(
      (entries) => {
        const lead = isFirstBatch ? HEADING_LEAD_MS : 0;
        // Bubbles that come into view together pop one after another, like a live chat.
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            (e.target as HTMLElement).style.transitionDelay = `${lead + i * STAGGER_MS}ms`;
            e.target.classList.add('in');
            io.unobserve(e.target);
            isFirstBatch = false;
          });
      },
      { threshold: 0.35, rootMargin: `0px 0px -${bottomInset}px 0px` },
    );
    msgs.forEach((m) => io.observe(m));
    return () => io.disconnect();
  }, []);

  return (
    <div className="chat" ref={chatRef}>
      {MESSAGES.map((m, i) => (
        <div
          key={i}
          className={`msg msg-${m.side}${m.groupStart && i > 0 ? ' msg--group-start' : ''}`}
        >
          {m.side === 'l' && (m.groupEnd ? <PolysocialAvatar /> : <div className="chat-avatar-space" />)}
          <div
            className={[
              'bubble',
              `bubble--${m.side}`,
              m.groupEnd ? 'bubble--tail' : '',
              m.wide ? 'bubble--wide' : '',
              m.oneLine ? 'bubble--one-line' : '',
            ].join(' ')}
          >
            {m.text}
          </div>
          {m.side === 'r' && <UserAvatar />}
        </div>
      ))}
    </div>
  );
}
