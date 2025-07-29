import { redirect } from "next/navigation";

export default function Page() {
  const logado = true;
  if (logado) {
    return redirect("/services");
  }
  return redirect("/login");
}
