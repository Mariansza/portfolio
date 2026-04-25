type SectionHeaderProps = {
  number: string;
  children: React.ReactNode;
};

export function SectionHeader({ number, children }: SectionHeaderProps) {
  return (
    <h2 className="text-mute m-0 font-mono text-[13px] font-normal tracking-wider uppercase">
      <span className="text-accent">{number} — </span>
      {children}
    </h2>
  );
}
