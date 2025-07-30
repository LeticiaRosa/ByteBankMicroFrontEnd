// import dynamic from "next/dynamic";

// const DashboardComponent = dynamic(import("dashboard/Dashboard"), {
//   ssr: false,
// });

export default function Account() {
  return (
    <div>
      <h1 className="bg-verde text-2xl">Account</h1>
      {/* <DashboardComponent /> */}
    </div>
  );
}
