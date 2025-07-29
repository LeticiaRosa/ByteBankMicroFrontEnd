interface BaseHeaderProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
}

const VARIANT_CLASSES = {
  primary: "bg-verde",
  secondary: "bg-black",
};

export function HeaderBase({ children, variant = "primary" }: BaseHeaderProps) {
  return (
    <header
      className={`${VARIANT_CLASSES[variant]} flex flex-col items-center justify-center py-6 w-full overscroll-none`}
    >
      <div className="container max-w-250 justify-between flex-row max-xs:items-center">
        {children}
      </div>
    </header>
  );
}
