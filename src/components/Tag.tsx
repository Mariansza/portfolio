type TagProps = {
  children: React.ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="border-mute-soft text-fg-dim inline-flex rounded-[3px] border px-2.5 py-1 font-mono text-[11px]">
      {children}
    </span>
  );
}
