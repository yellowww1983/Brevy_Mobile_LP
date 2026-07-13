/**
 * Semantic icon aliases. Sections import meaning, not Lucide names, so
 * swapping an icon is a one-line change here and never touches a section.
 */
import {
  Clock,
  Wallet,
  Users,
  GraduationCap,
  ListChecks,
  MapPin,
  ShieldCheck,
  Lock,
  EyeOff,
  BadgeCheck,
  ArrowRight,
  Play,
  Check,
  X,
  Eye,
  ScanFace,
  ChevronRight,
  Building2,
  Calendar,
  CircleCheck,
  CircleDollarSign,
  Receipt,
  Menu,
  MessageCircleHeart,
} from "lucide-react"
import { AppleLogo, AndroidLogo } from "@/lib/brand-icons"

export const Icon = {
  hours: Clock,
  pay: Wallet,
  patients: Users,
  trainings: GraduationCap,
  setup: ListChecks,
  evv: MapPin,
  compliance: ShieldCheck,
  secure: Lock,
  privacy: EyeOff,
  verified: BadgeCheck,
  arrow: ArrowRight,
  play: Play,
  ios: AppleLogo,
  android: AndroidLogo,
  check: Check,
  cross: X,
  eye: Eye,
  scanFace: ScanFace,
  chevronRight: ChevronRight,
  building: Building2,
  calendar: Calendar,
  circleCheck: CircleCheck,
  dollar: CircleDollarSign,
  stub: Receipt,
  menu: Menu,
  chat: MessageCircleHeart,
} as const

export type IconName = keyof typeof Icon
