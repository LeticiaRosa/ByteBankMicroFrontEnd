import Link from "next/link";

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "button";
}

const VARIANT_CLASSES = {
  primary: "link",
  secondary: "link-secoundary",
  button: "btn-secoundary",
};

export default function LinkButton({
  href,
  children,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <Link href={href} className={VARIANT_CLASSES[variant]} {...props}>
      {children}
    </Link>
  );
}
