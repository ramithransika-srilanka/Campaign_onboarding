import { useEffect, useRef, type ReactNode } from 'react';
import { CAMPAIGN_URL } from '../config';

// Ported from the "It's very uncomplicated." section of the Polysocial home page
// (Polysocial-mobile/index.html #chat), without the heading.

// Delay between bubbles that appear at the same time.
const STAGGER_MS = 140;

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
};

const MESSAGES: Message[] = [
  { side: 'r', text: 'How does it work?', groupStart: true, groupEnd: true },
  { side: 'l', text: 'Its so simple', groupStart: true },
  { side: 'l', text: 'There are many open campaigns created by brands in our platform', wide: true },
  { side: 'l', text: 'You can choose which campaign you are interested in', groupEnd: true, wide: true },
  { side: 'r', text: 'How can I know what to create?', groupStart: true, groupEnd: true, wide: true },
  { side: 'l', text: 'All the guidelines are mentioned inside the campaign', groupStart: true, wide: true },
  { side: 'l', text: 'Create the content and upload in your profile and submit the link', groupEnd: true, wide: true },
  { side: 'r', text: 'Thats it?', groupStart: true, groupEnd: true },
  { side: 'l', text: 'Yep.', groupStart: true },
  { side: 'l', text: 'Once the content is approved, you can start earning.', wide: true },
  { side: 'l', text: 'You earn based on the reach you get for your content', wide: true },
  {
    side: 'l',
    text: (
      <>
        Click <a href={CAMPAIGN_URL}>here</a> to start
      </>
    ),
    groupEnd: true,
  },
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
    const io = new IntersectionObserver(
      (entries) => {
        // Bubbles that come into view together pop one after another, like a live chat.
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            (e.target as HTMLElement).style.transitionDelay = `${i * STAGGER_MS}ms`;
            e.target.classList.add('in');
            io.unobserve(e.target);
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
            ].join(' ')}
          >
            {m.text}
          </div>
          {m.side === 'r' && <UserAvatar />}
        </div>
      ))}
      <div className="msg msg-r msg--group-start">
        <picture>
          <img
            className="chat-gif"
            src={asset('payout.webp')}
            alt="Animated illustration celebrating a creator payout"
            width={320}
            height={320}
          />
        </picture>
        <UserAvatar />
      </div>
    </div>
  );
}
