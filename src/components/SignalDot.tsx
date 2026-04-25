type SignalDotProps = {
  size?: number;
  className?: string;
};

export function SignalDot({ size = 8, className = '' }: SignalDotProps) {
  return (
    <span
      aria-hidden
      className={`bg-accent inline-block rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: '0 0 8px var(--color-accent)',
      }}
    />
  );
}
