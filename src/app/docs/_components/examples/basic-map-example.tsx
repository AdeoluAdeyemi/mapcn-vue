import { Map } from "@/registry/map";

export function BasicMapExample() {
  return (
    <div className="h-[400px] w-full overflow-hidden">
      <Map center={[-74.006, 40.7128]} zoom={12} />
    </div>
  );
}
