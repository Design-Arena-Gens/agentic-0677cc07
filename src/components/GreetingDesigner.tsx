'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './GreetingDesigner.module.css';

const tones = [
  { id: 'friendly', label: 'Friendly' },
  { id: 'playful', label: 'Playful' },
  { id: 'professional', label: 'Professional' },
  { id: 'excited', label: 'Excited' },
] as const;

type ToneId = (typeof tones)[number]['id'];

const intros = {
  friendly: ['Hey', 'Hi there', 'Hello'],
  playful: ['Yo', 'Heya', 'What’s up'],
  professional: ['Greetings', 'Good day', 'Hello'],
  excited: ['Hi!!!', 'Hey!!!', 'Oh hi!'],
} as const;

const closers = {
  friendly: ['Hope you are doing well.', 'It is great to see you.', 'Let’s catch up soon!'],
  playful: ['Ready for some fun?', 'Let’s make today awesome!', 'Catch you later!'],
  professional: ['How can I assist today?', 'Wishing you a productive day.', 'Let me know how I can help.'],
  excited: ['This is so exciting!', 'Let’s do this!', 'Can’t wait to get started!'],
} as const;

const fonts = ['Serif', 'Sans Serif', 'Monospace'] as const;

const emojiPack: Record<ToneId, readonly string[]> = {
  friendly: ['😊', '🤗', '✨'],
  playful: ['😜', '🤪', '🎉'],
  professional: ['💼', '📈', '🗂️'],
  excited: ['🔥', '🚀', '🎊'],
};

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function GreetingDesigner() {
  const [name, setName] = useState('friend');
  const [tone, setTone] = useState<ToneId>('friendly');
  const [emojis, setEmojis] = useState(true);
  const [font, setFont] = useState<(typeof fonts)[number]>('Sans Serif');
  const [customMessage, setCustomMessage] = useState('');
  const [cycling, setCycling] = useState(false);
  const [cycleTimer, setCycleTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  const greeting = useMemo(() => {
    const intro = pickRandom(intros[tone]);
    const closer = pickRandom(closers[tone]);
    const chosenEmoji = emojis ? ` ${pickRandom(emojiPack[tone])}` : '';
    const displayName = name.trim() || 'friend';

    if (customMessage.trim()) {
      return `${intro}, ${displayName}! ${customMessage.trim()}${chosenEmoji}`;
    }

    return `${intro}, ${displayName}! ${closer}${chosenEmoji}`;
  }, [name, tone, emojis, customMessage]);

  const previewFontFamily = useMemo(() => {
    switch (font) {
      case 'Serif':
        return `'Times New Roman', Times, serif`;
      case 'Monospace':
        return `'Courier New', Courier, monospace`;
      default:
        return `var(--font-geist-sans, 'Inter', system-ui, -apple-system)`;
    }
  }, [font]);

  useEffect(() => {
    return () => {
      if (cycleTimer) {
        clearInterval(cycleTimer);
      }
    };
  }, [cycleTimer]);

  const toggleCycling = () => {
    if (cycling) {
      if (cycleTimer) {
        clearInterval(cycleTimer);
        setCycleTimer(null);
      }
      setCycling(false);
      return;
    }

    const timer = setInterval(() => {
      setTone((current) => {
        const currentIdx = tones.findIndex((t) => t.id === current);
        const nextIdx = (currentIdx + 1) % tones.length;
        return tones[nextIdx].id;
      });
    }, 2000);

    setCycleTimer(timer);
    setCycling(true);
  };

  return (
    <section className={styles.designer}>
      <div className={styles.designer__panel}>
        <label className={styles.designer__group}>
          <span>Name to greet</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Type a name"
            className={styles.designer__input}
          />
        </label>

        <fieldset className={styles.designer__group}>
          <legend>Tone</legend>
          <div className={styles.designer__chips}>
            {tones.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setTone(option.id)}
                className={
                  tone === option.id
                    ? `${styles.designer__chip} ${styles['designer__chip--active']}`
                    : styles.designer__chip
                }
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className={styles.designer__checkbox}>
          <input
            type="checkbox"
            checked={emojis}
            onChange={(event) => setEmojis(event.target.checked)}
          />
          <span>Add playful emojis</span>
        </label>

        <label className={styles.designer__group}>
          <span>Font style</span>
          <select
            value={font}
            onChange={(event) => setFont(event.target.value as (typeof fonts)[number])}
            className={styles.designer__input}
          >
            {fonts.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.designer__group}>
          <span>Custom message (optional)</span>
          <textarea
            value={customMessage}
            onChange={(event) => setCustomMessage(event.target.value)}
            placeholder="Add a personal note…"
            className={styles.designer__textarea}
            rows={3}
          />
        </label>

        <button type="button" className={styles.designer__cycle} onClick={toggleCycling}>
          {cycling ? 'Stop auto-tone' : 'Auto-cycle tones'}
        </button>
      </div>

      <div className={styles.designer__preview}>
        <p className={styles.designer__eyebrow}>Personalized greeting</p>
        <h2 style={{ fontFamily: previewFontFamily }}>{greeting}</h2>
        <p className={styles.designer__hint}>
          Share it with someone you appreciate. Small hellos create big smiles.
        </p>
      </div>
    </section>
  );
}

export default GreetingDesigner;
