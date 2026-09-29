import type { LucideIcon } from "lucide-react";
import { Biohazard, Building2, Droplets, Flame, Hammer, House, PackageCheck, PanelsTopLeft, Refrigerator, Wrench } from "lucide-react";

export interface ServiceFaq { question: string; answer: string }
export interface ServiceEntry {
  id: string; title: string; shortTitle: string; subtitle: string; icon: LucideIcon;
  body: string; points: string[]; image: string; imageAlt: string; causes: string[]; faqs: ServiceFaq[];
}

export const services: ServiceEntry[] = [
  {
    id: "water-damage-restoration", title: "Water Damage Restoration", shortTitle: "Water damage", subtitle: "Extraction, drying and moisture documentation", icon: Droplets,
    body: "A water loss can keep spreading after the visible puddle is gone. RestoreIQ traces where the water traveled, removes standing water, sets a drying plan, and records moisture readings until the affected materials reach the project target.",
    points: ["Water extraction", "Moisture mapping", "Structural drying", "Progress documentation"], image: "/Real-life-images/MSP_7706.jpg", imageAlt: "Technician extracting water from carpet inside a home",
    causes: ["Supply-line failures", "Roof and window intrusion", "Overflowing fixtures", "Storm water entry"],
    faqs: [
      { question: "What should I do first?", answer: "If it is safe, stop the water at its source and avoid electrical hazards. Then call RestoreIQ so the affected area can be assessed before more water migrates into nearby materials." },
      { question: "Can wet materials always be saved?", answer: "That depends on the water category, how long materials stayed wet, and what they are made of. Moisture readings and the condition of each material guide the recommendation." },
      { question: "Will you document the loss?", answer: "The restoration file can include photographs, moisture readings, equipment records, and progress notes for the homeowner and, when authorized, the adjuster." },
    ],
  },
  {
    id: "fire-smoke-damage", title: "Fire & Smoke Damage Restoration", shortTitle: "Fire & smoke", subtitle: "Stabilization, soot cleanup and odor control", icon: Flame,
    body: "Fire damage is rarely limited to the burned area. Soot, smoke residue, suppression water, and odor can move through adjoining rooms. RestoreIQ builds a room-by-room restoration scope that separates salvageable contents from materials requiring removal.",
    points: ["Emergency stabilization", "Soot and residue cleaning", "Odor-control planning", "Contents coordination"], image: "/Real-life-images/463D1AD5-739C-4DCE-9F31-3D124BF46CF1.jpg", imageAlt: "Restoration work underway inside an affected property",
    causes: ["Kitchen fires", "Electrical incidents", "Candle and fireplace smoke", "Wildfire smoke intrusion"],
    faqs: [
      { question: "Is smoke damage limited to the room where the fire started?", answer: "Not necessarily. Air movement can carry fine residue into adjacent rooms, closets, and HVAC pathways, so the inspection should extend beyond the visibly affected area." },
      { question: "Should I clean soot myself?", answer: "Avoid wiping dry soot with household cleaners. The wrong method can smear or set residue into a surface. Wait for material-specific cleaning guidance." },
      { question: "What happens to affected belongings?", answer: "Items are evaluated by material and condition. The restoration plan identifies what can be cleaned on site, what may need specialty handling, and what should be documented as non-salvageable." },
    ],
  },
  {
    id: "sewage-cleanup", title: "Sewage Cleanup", shortTitle: "Sewage cleanup", subtitle: "Controlled cleanup for contaminated water", icon: Biohazard,
    body: "Sewage and other contaminated-water losses require different decisions than a clean supply-line leak. RestoreIQ isolates the affected area, removes unsafe porous materials when required, cleans remaining hard surfaces, and documents the work before drying begins.",
    points: ["Affected-area containment", "Contaminated material removal", "Cleaning and disinfection", "Drying and documentation"], image: "/services/svc-sewage.jpg", imageAlt: "Professional extraction equipment in an affected room",
    causes: ["Sewer backups", "Toilet overflows", "Drain-line failures", "Contaminated storm water"],
    faqs: [
      { question: "Can I stay in the affected room?", answer: "Keep people and pets away from sewage-affected areas. Avoid direct contact and do not operate fans that could move contaminants into clean rooms." },
      { question: "Can carpet be cleaned after sewage exposure?", answer: "Many porous materials exposed to contaminated water cannot be safely restored. The recommendation depends on the water source, exposure, and applicable restoration standards." },
      { question: "Does cleanup include drying?", answer: "Yes. After removal and cleaning decisions are complete, remaining structural materials are dried and monitored with moisture readings." },
    ],
  },
  {
    id: "burst-pipe-cleanup", title: "Burst-Pipe Cleanup", shortTitle: "Burst pipes", subtitle: "Fast control after a pressurized pipe failure", icon: Wrench,
    body: "A burst pipe can release a large volume of water into wall cavities, ceilings, and flooring. RestoreIQ focuses on limiting migration, extracting accessible water, mapping hidden moisture, and coordinating restoration once the plumbing source has been stopped by the appropriate trade.",
    points: ["Emergency extraction", "Wall and ceiling moisture checks", "Contents protection", "Drying-plan adjustments"], image: "/Real-life-images/IMG_2342.jpg", imageAlt: "Technician using extraction equipment on wet flooring",
    causes: ["Failed supply lines", "Frozen or aging pipes", "Corroded fittings", "Pipe-joint separation"],
    faqs: [
      { question: "Do you repair the broken pipe?", answer: "RestoreIQ handles the resulting water damage. Plumbing repairs should be completed by the appropriately licensed trade; the teams can coordinate timing so mitigation is not delayed." },
      { question: "How do you check inside walls?", answer: "Technicians use moisture meters and other inspection tools to compare affected and unaffected materials and map likely water migration." },
      { question: "Should I turn off the water?", answer: "If you can reach the shutoff safely, stop the water supply. If water is near electrical equipment or the shutoff is unsafe to access, leave the area and call for help." },
    ],
  },
  {
    id: "appliance-leak-cleanup", title: "Appliance-Leak Cleanup", shortTitle: "Appliance leaks", subtitle: "Targeted drying behind cabinets and finishes", icon: Refrigerator,
    body: "Dishwashers, refrigerators, washing machines, and water heaters often leak into concealed edges before the problem becomes obvious. RestoreIQ checks adjoining cabinets, baseboards, flooring, and wall materials so the drying scope follows the water rather than the stain.",
    points: ["Cabinet and toe-kick inspection", "Flooring moisture checks", "Targeted extraction", "Low-impact drying options"], image: "/Real-life-images/IMG_2347.jpg", imageAlt: "Air mover drying hardwood flooring in a home",
    causes: ["Dishwasher supply leaks", "Washing-machine hoses", "Refrigerator lines", "Water-heater failures"],
    faqs: [
      { question: "Can water be trapped under cabinets?", answer: "Yes. Water can move beneath toe kicks and cabinet bases without remaining visible. Inspection readings help determine how far it traveled." },
      { question: "Do appliances need to be moved?", answer: "Sometimes. The safest access method depends on the appliance, utility connections, and condition of the surrounding floor. The scope is explained before work proceeds." },
      { question: "What about the failed appliance?", answer: "RestoreIQ addresses the property damage. Appliance repair or replacement is handled separately, and the water source should remain off until it is corrected." },
    ],
  },
  {
    id: "hardwood-floor-drying", title: "Hardwood-Floor Drying", shortTitle: "Hardwood drying", subtitle: "Measured drying for wet wood flooring", icon: PanelsTopLeft,
    body: "Wood flooring can hold moisture below the surface and change shape as it dries. RestoreIQ measures affected and comparison areas, evaluates the floor assembly, and uses a controlled approach intended to give salvageable flooring the best practical chance of recovery.",
    points: ["Board and subfloor readings", "Specialty floor-drying systems", "Daily progress checks", "Clear salvage assessment"], image: "/Real-life-images/IMG_2347.jpg", imageAlt: "Professional drying equipment positioned over hardwood flooring",
    causes: ["Dishwasher leaks", "Plumbing failures", "Window and door intrusion", "Overflowing fixtures"],
    faqs: [
      { question: "Does cupped wood always need replacement?", answer: "No. Some floors improve through controlled drying, while others have permanent damage. Species, finish, installation method, exposure, and readings all matter." },
      { question: "Why not dry the floor as fast as possible?", answer: "Aggressive drying can create additional stress in wood. Equipment and conditions should be adjusted in response to measured progress." },
      { question: "How is the subfloor checked?", answer: "The inspection method depends on the floor assembly. Readings may be taken from accessible areas above, below, or at selected test points." },
    ],
  },
  {
    id: "crawlspace-drying", title: "Crawlspace Drying", shortTitle: "Crawlspace drying", subtitle: "Access, cleanup and drying below the home", icon: House,
    body: "Water in a crawlspace can affect insulation, floor framing, subflooring, and indoor conditions above. RestoreIQ evaluates access and safety first, then removes water and affected debris, documents structural moisture, and creates a drying plan for the space.",
    points: ["Standing-water removal", "Insulation and debris evaluation", "Framing moisture readings", "Confined-space equipment planning"], image: "/Real-life-images/3B0A6D7A-4D35-4E5D-8CB5-001804DFA8F3.jpg", imageAlt: "Restoration inspection and equipment at a residential property",
    causes: ["Plumbing leaks", "Groundwater entry", "Drainage failures", "Storm-related intrusion"],
    faqs: [
      { question: "Is crawlspace water an emergency?", answer: "Active water entry and standing water should be assessed promptly, especially when utilities, contaminated water, or structural materials may be involved." },
      { question: "Will wet insulation be removed?", answer: "Insulation is evaluated based on its type, contamination, condition, and ability to dry. Any recommended removal is explained as part of the scope." },
      { question: "How do you know framing is dry?", answer: "Moisture readings are compared over time and against an appropriate dry reference for the structure." },
    ],
  },
  {
    id: "commercial-water-damage", title: "Commercial Water Damage", shortTitle: "Commercial losses", subtitle: "Restoration planning around business operations", icon: Building2,
    body: "Commercial losses require fast decisions about safety, access, occupied areas, inventory, and operating continuity. RestoreIQ organizes the property into work zones, documents conditions, and sequences extraction and drying around the needs of the site.",
    points: ["Phased work zones", "After-hours coordination", "Large-loss equipment planning", "Stakeholder documentation"], image: "/Real-life-images/MSP_7577.jpg", imageAlt: "Restoration equipment operating inside a commercial space",
    causes: ["Fire-suppression discharge", "Restroom and drain backups", "Roof intrusion", "Mechanical-system leaks"],
    faqs: [
      { question: "Can the business remain open?", answer: "That depends on safety, the affected area, and the work required. Where practical, the plan can divide the property into controlled zones to reduce disruption." },
      { question: "Who receives project updates?", answer: "RestoreIQ can organize communication for the authorized property, facilities, tenant, and insurance contacts identified at the start of the project." },
      { question: "Can work happen outside business hours?", answer: "Scheduling requirements are reviewed during dispatch and scoping so critical work can be planned around site access and operations." },
    ],
  },
  {
    id: "contents-protection", title: "Contents Protection", shortTitle: "Contents protection", subtitle: "Documenting and protecting belongings during restoration", icon: PackageCheck,
    body: "Furniture and personal property can block access to wet materials or face additional exposure during restoration. RestoreIQ documents affected areas, moves or protects items as the scope requires, and keeps the handling plan connected to the property restoration.",
    points: ["Room and item documentation", "On-site protection", "Pack-out coordination when needed", "Return planning"], image: "/Real-life-images/MSP_7604.jpg", imageAlt: "Restored interior with household contents protected",
    causes: ["Water migration", "Smoke and soot exposure", "Construction access", "Contaminated-water losses"],
    faqs: [
      { question: "Does everything need to leave the home?", answer: "No. The decision depends on contamination, available work space, the condition of the items, and whether they prevent access to affected materials." },
      { question: "How are items tracked?", answer: "When off-site handling is needed, the scope should define the inventory, documentation, and custody process before items are moved." },
      { question: "What can stay in the room?", answer: "Items may remain if they are unaffected, can be protected, and do not interfere with safe restoration work. The crew reviews this room by room." },
    ],
  },
  {
    id: "reconstruction", title: "Reconstruction", shortTitle: "Reconstruction", subtitle: "Putting affected rooms back together", icon: Hammer,
    body: "After mitigation is complete, removed finishes and assemblies may need to be rebuilt. RestoreIQ defines the repair scope from the documented demolition, coordinates material selections, and plans reconstruction only after the structure is ready for put-back.",
    points: ["Repair-scope development", "Drywall, trim and paint", "Flooring coordination", "Completion walkthrough"], image: "/services/svc-reconstruction.jpg", imageAlt: "Technician completing interior reconstruction work",
    causes: ["Post-mitigation repairs", "Fire-damaged finishes", "Contaminated material removal", "Access opened for drying"],
    faqs: [
      { question: "When can reconstruction start?", answer: "Put-back begins after the affected structure has reached the project drying target and the repair scope is approved." },
      { question: "Is reconstruction part of the insurance claim?", answer: "It may be, depending on the cause of loss and policy. Coverage and payment decisions remain with the carrier under the customer’s policy." },
      { question: "Can you match existing finishes?", answer: "The team reviews available materials and practical matching options with the property owner before selections are finalized." },
    ],
  },
];

export function getService(id: string) { return services.find((service) => service.id === id) }
