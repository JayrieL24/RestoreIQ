import { ClipboardCheck, Gauge, ScanSearch } from "lucide-react";

const features = [
  { Icon: ScanSearch, title: "Inspect", body: "Affected walls, floors, and adjoining materials are checked." },
  { Icon: Gauge, title: "Map", body: "Room-by-room readings define the known moisture footprint." },
  { Icon: ClipboardCheck, title: "Monitor", body: "Follow-up readings guide equipment and drying decisions." },
];

export function ResponseFeatureList() {
  return <ul className="voda-feature-list">{features.map(({ Icon, title, body }) => <li key={title}><Icon aria-hidden /><span><b>{title}</b>{body}</span></li>)}</ul>;
}
