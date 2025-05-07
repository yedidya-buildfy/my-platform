import AppTypeStep from "@/app/new-project/steps/AppTypeStep";

export default function AppTypePage() {
  return <AppTypeStep onNext={(type) => console.log("Next:", type)} />;
}
