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
  onClick,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={VARIANT_CLASSES[variant]} href={href} {...props}>
      <span onClick={onClick}>{children}</span>
    </Link>
  );
}
