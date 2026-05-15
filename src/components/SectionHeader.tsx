type SectionHeaderProps = {
  children: React.ReactNode;
};

export function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <h2 className="text-accent m-0 font-mono text-[13px] font-normal tracking-wider uppercase">
      {children}
    </h2>
  );
}
