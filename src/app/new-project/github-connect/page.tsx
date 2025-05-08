import GitHubConnectStep from "@/app/new-project/steps/GitHubConnectStep";

export default function GitHubConnectPage() {
  return <GitHubConnectStep onNext={() => console.log("Next")} />;
}
