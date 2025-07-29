import Image from "next/image";
import LinkButton from "../components/ui/form/Link";

export default function NotFound() {
  return (
    <div className="absolute left-0 top-0  h-screen w-screen bg-verde text-white gap-10">
      <div className="flex flex-col items-center justify-center h-screen gap-10">
        <Image
          src="/404.png"
          alt="404 Not Found"
          width={300}
          height={300}
          className="w-auto h-auto"
        />
        <p>Could not find requested resource</p>

        <LinkButton variant="button" href="/services">
          Return Home
        </LinkButton>
      </div>
    </div>
  );
}
